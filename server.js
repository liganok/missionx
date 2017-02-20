import 'babel-register';
import Express from 'express';
import Path from 'path';
import {default as Logger} from 'morgan';
import BodyParser from 'body-parser';
import Mongoose from 'mongoose';
import Async from 'async';

import Swig from 'swig';
import React from 'react';
import ReactDOM from 'react-dom/server';
import {match, RoutingContext} from 'react-router';


import Config from './config';
import Mission from './models/mission';
import routes from './app/routes';

import Business from './server/biz/Business';
import Utils from './server/Utils';
import {TYPE_INBOX, TYPE_TASK, TYPE_PLAN} from './server/Const';


let app = Express();
{
  Mongoose.connect(Config.database);
  Mongoose.connection.on('error', function () {
    console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
  });

  app.set('port', process.env.PORT || 3000);
  app.use(Logger('dev'));
  app.use(BodyParser.json());
  app.use(BodyParser.urlencoded({extended: false}));
  app.use(Express.static(Path.join(__dirname, 'public')));
}

app.post('/api/mission', function (req, res, next) {
  let item = {
    parentId: req.body.parentId,
    name: req.body.name,
    description: req.body.description,
    type: req.body.type
  };
  Business.addItem(item)
    .then((data) => {
      console.log('/api/mission', data);
      res.send(data);
    });
});

app.put('/api/mission', function (req, res, next) {
  let condition = req.body;
  console.log('put/api/mission', JSON.stringify(condition));
  Business.updateItem(condition)
    .then((data) => {
      res.send(data);
    });
});

app.get('/api/missionList', function (req, res, next) {
  let condition = req.query.condition;
  if (req.query.type == 'PLAN') {
    Object.assign(condition,{parentId:{$eq: null}});
  };
  Business.getGeneralList(condition).then((data)=>{
    res.send(data);
  });
});

app.get('/api/mission', function (req, res, next) {
  console.log('get mission' + req.query.id);
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

app.get('/api/test', function (req, res, next) {
  //res.send(Business.addTask());
  //res.send(Business.updateTask());
  /*let promise = Business.getItemWithSubList({_id:'5896919ca63ea406b976b67b'});
   promise.then(function (v) {
   console.log('tmp1',v);
   res.send(v);
   })*/
  //console.log('tmp1',tmp);


});
app.get('/api/migration', function (req, res, next) {
  Utils.migration().then((data)=>{
    res.send(data);
  });
});


app.use(function (req, res) {
  match({routes: routes, location: req.url}, function (err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      var html = ReactDOM.renderToString(React.createElement(RoutingContext, renderProps));
      var page = Swig.renderFile('views/index.html', {html: html});
      res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});


app.use(function (req, res) {
  res.send('hello world');
});

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});


//http://stackoverflow.com/questions/37603414/reactrouter2-default-undefined-using-babel refer to get solution