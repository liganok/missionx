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
app.post('/api/mission', function (req, res, next) {
  var name = req.body.name;
  var time = new Date().getTime();
  var _id = mongoose.Types.ObjectId();
  var parentId = req.body.parentId;
  console.log(parentId);

  console.log(req.body.type);

  if (req.body.type == 'PLAN') {
    parentId = null;
    var type = 'PLAN';
  }
  if (req.body.type == 'TASK') {
    if (req.body.parentId) {
      parentId = req.body.parentId
    } else {
      parentId = null;
    }
  }

  try {
    var mission = new Mission({
      _id: _id,
      parentId: parentId,
      name: name,
      type: type,
      description: name,
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
  console.log('put',missionId + isDone);
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

  var p = req.query;
  console.log('id',p.isDone);
  if (p.id) {
    async.auto({
        get_child_num: function (callback) {
          Mission
            .aggregate()
            .match({parentId: {$ne: null}})
            .group({_id: '$parentId', num: {$sum: 1}})
            .exec(function (err, res) {
              callback(null, res);
            });
        },
        get_child_num_done: function (callback) {
          Mission
            .aggregate()
            .match({parentId: {$ne: null}, isDone: true})
            .group({_id: '$parentId', num: {$sum: 1}})
            .exec(function (err, res2) {
              callback(null, res2);
            });
        },
        get_plans: function (callback) {
          var para = {'isDone': p.isDone, "parentId": p.id};
          Mission
            .find(para)
            .exec(function (err, missions) {
              if (err) return next(err);
              console.log('get_plansxx',missions);
              callback(null, missions);
            });
        },

      },
      function (err, results) {
        var plans = results.get_plans.map(function (item) {
          let child = results.get_child_num.find((n) => n._id.equals(item._id));
          var childNum = child? child.num : 0;
          let childDone = results.get_child_num_done.find((n) => n._id.equals(item._id));
          var childNumDone = childDone ? childDone.num : 0;
          let plan = {
            _id: item._id,
            parentId: item.parentId,
            name: item.name,
            description: item.description,
            type: item.type,
            createTime: item.createTime,
            updateTime: item.updateTime,
            dueTime: item.dueTime,
            isDone: item.isDone,
            tags: item.tags,
            status:item.status,
            childNum: childNum,
            childNumDone: childNumDone
          };
          return plan;
        })

        //console.log('subitems',plans );
        res.send(plans)
      }
    );
  }

});

app.get('/api/plans', function (req, res, next) {

  var p = req.query;
  console.log(p.isDone);

  async.auto({
      get_parent: function (callback) {
        Mission
          .find({'parentId': {$ne: null}})
          .exec(function (err, missions_tmp) {
            if (err) return next(err);
            var parentIdArr = missions_tmp.map(function (mission) {
              return mission.parentId
            });
            //console.log(parentIdArr);
            callback(null, parentIdArr);
          });
      },
      get_child_num: function (callback) {
        Mission
          .aggregate()
          .match({parentId: {$ne: null}})
          .group({_id: '$parentId', num: {$sum: 1}})
          .exec(function (err, res) {
            callback(null, res);
          });
      },
      get_child_num_done: function (callback) {
        Mission
          .aggregate()
          .match({parentId: {$ne: null}, isDone: true})
          .group({_id: '$parentId', num: {$sum: 1}})
          .exec(function (err, res2) {
            callback(null, res2);
          });
      },
      get_plans: ['get_parent', function (results, callback) {
        var parentIdArr = results.get_parent;
        var para = {
          $or: [{'isDone': p.isDone, 'parentId': null, 'type': 'PLAN'}, {
            'isDone': p.isDone,
            'parentId': null,
            '_id': {$in: parentIdArr}
          }]
        }
        Mission
          .find(para)
          .exec(function (err, missions) {
            if (err) return next(err);
            //console.log('get_plans',parentIdArr);
            callback(null, missions);
          });
      }],

    },
    function (err, results) {
      var plans = results.get_plans.map(function (item) {
        let child = results.get_child_num.find((n) => n._id.equals(item._id));
        var childNum = child? child.num : 0;
        let childDone = results.get_child_num_done.find((n) => n._id.equals(item._id));
        var childNumDone = childDone ? childDone.num : 0;
        let plan = {
          _id: item._id,
          parentId: item.parentId,
          name: item.name,
          description: item.description,
          type: item.type,
          createTime: item.createTime,
          updateTime: item.updateTime,
          dueTime: item.dueTime,
          isDone: item.isDone,
          tags: item.tags,
          status:item.status,
          childNum: childNum,
          childNumDone: childNumDone
        };
        return plan;
      })

      //console.log('plans',plans );
      res.send(plans)
    }
  );

});

app.get('/api/tasks', function (req, res, next) {

  var p = req.query;

  console.log(p.isDone);

  Mission
    .find({})
    .exec(function (err, missions_tmp) {
      if (err) return next(err);
      var parentIdArr = missions_tmp.map(function (mission) {
        return mission.parentId
      });
      //console.log(parentIdArr);
      var para = {'isDone': p.isDone, '_id': {$nin: parentIdArr}, 'type': {$ne: 'PLAN'}};
      Mission
        .find(para)
        .exec(function (err, missions) {
          if (err) return next(err);
          res.send(missions);
        });
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

app.delete('/api/mission', function (req, res, next) {
  let missionId = req.body.missionId;

  Mission.findOne({_id:missionId},function (err, mission) {
    if(err) return next(err);

    if(!mission){
      return res.status(404).send({message:'Mission not found.'});
    }
    mission.status = 'DELETED';
    Mission.save(function (err) {
      callback(err);
    });
    return res.send({message:mission.name + ' has been deleted.'});
  });
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