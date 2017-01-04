// Babel ES6/JSX Compiler
require('babel-register');

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var async = require('async');

var swig = require('swig');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var xml2js = require('xml2js');

var config = require('./config');
var routes = require('./app/routes');
var Mission = require('./models/mission');

var app = express();

mongoose.connect(config.database);
mongoose.connection.on('error', function () {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
});

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * POST /api/missions
 * Adds new mission to the database.
 */
app.post('/api/missions', function (req, res, next) {
  var name = req.body.name;
  var time = new Date().getTime();
  var _id = mongoose.Types.ObjectId();
  var parentId = req.body.parentId;
  console.log(parentId);

  console.log(req.body.type);

  if (req.body.type == 'PLAN') {
    var parentId = null;
  }
  if (req.body.type == 'TASK') {
    if (req.body.parentId) {
      parentId = req.body.parentId
    } else {
      parentId = _id;
    }
  }

  try {
    var mission = new Mission({
      _id: _id,
      parentId: parentId,
      name: name,
      createTime: time,
      updateTime: time,
      status: 'ACTIVE'
    });
    mission.save(function (err) {
      if (err) return next(err);
      res.send({message: name + 'has been added successfully!'});
    });

  } catch (e) {
    res.status(404).send({message: name + ' is not saved.'});
  }
});

app.put('/api/missions', function (req, res, next) {
  var missionId = req.body.missionId;
  var isDone = req.body.isDone;
  var time = new Date().getTime();
  console.log(missionId + isDone);
  if (missionId) {
    console.log(missionId + isDone + '2');
    try {
      Mission.update({'_id': missionId}, {$set: {'isDone': isDone, updateTime: time}}, function (err) {
        console.log(missionId + isDone + '3');
        if (err) return next(err);
        res.send({message: missionId + 'has been updated successfully!'});
      });

    } catch (e) {
      res.status(404).send({message: missionId + ' is not saved.'});
    }
  }
});

app.get('/api/missions', function (req, res, next) {

  /* var isDone = req.query.isDone;
   console.log(req.query.id);
   if (isDone == null) {
   isDone = false
   }
   if (req.query.id) {
   var para = {'isDone': isDone, "parentId": req.query.id, "_id":{$ne:req.query.id}};
   } else {
   if(isDone){
   para = {'isDone': {"$in":req.query.isDone}};
   }else {
   para = {'ID': 1};
   }
   }
   Mission
   .find(para)
   .exec(function (err, missions) {
   if (err) return next(err);
   res.send(missions);
   });*/

  var p = req.query;

  if (p.id) {
    var para = {'isDone': p.isDone, "parentId": p.id};
    Mission
      .find(para)
      .exec(function (err, missions) {
        if (err) return next(err);
        res.send(missions);
      });
  } else {
    if (p.type == 'TASK') {
      console.log(p.isDone);
      Mission
        .find({'parentId': {$ne: null}})
        .exec(function (err, missions_tmp) {
          if (err) return next(err);
          var para = {'isDone': p.isDone, '_id': {"$nin": missions_tmp.parentId}};
          Mission
            .find(para)
            .exec(function (err, missions) {
              if (err) return next(err);
              res.send(missions);
            });
        });
    }
    if (p.type == 'PLAN') {
      console.log(p.isDone);
      Mission
        .find({'parentId': {$ne: null}})
        .exec(function (err, missions_tmp) {
          if (err) return next(err);
          var para = {'isDone': p.isDone, '_id': {"$in": missions_tmp.parentId}};
          Mission
            .find(para)
            .exec(function (err, missions) {
              if (err) return next(err);
              res.send(missions);
            });
        });
    }
    if (p.type == 'INBOX') {

    }
  }

});

app.get('/api/plans', function (req, res, next) {

  var p = req.query;
  console.log(p.isDone);
  var para = {'isDone': p.isDone, 'parentId': null};
  Mission
    .find(para)
    .exec(function (err, plans) {
      if (err) return next(err);
      res.send(plans);
    });

});

app.get('/api/tasks', function (req, res, next) {

  var p = req.query;
  console.log(p.isDone);

  var para = {'isDone': p.isDone};
  Mission
    .find(para)
    //.where('_id').equals(this.parentId)
    .exec(function (err, missions) {
      if (err) return next(err);
      res.send(missions);
    });

});


app.get('/api/mission', function (req, res, next) {
  if (req.query.id) {
    console.log('get mission' + req.query.id);
    var para = {"_id": req.query.id};
    Mission
      .find(para)
      .exec(function (err, missions) {
        if (err) return next(err);
        res.send(missions);
      });
  }
});


app.use(function (req, res) {
  Router.match({routes: routes.default, location: req.url}, function (err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
      var page = swig.renderFile('views/index.html', {html: html});
      res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});