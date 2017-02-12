import 'babel-register';
import Express from 'express';
import Path from 'path';
import { default as Logger} from 'morgan';
import BodyParser from 'body-parser';
import Mongoose from 'mongoose';
import Async from 'async';

import Swig from 'swig';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { match, RoutingContext } from 'react-router';


import Config from './config';
import Mission from './models/mission';
import routes from './app/routes';

import Business from './server/biz/Business';
import {TYPE_INBOX,TYPE_TASK,TYPE_PLAN } from './server/Const';


let app = Express();
{
  Mongoose.connect(Config.database);
  Mongoose.connection.on('error', function () {
    console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
  });

  app.set('port',process.env.PORT || 3000);
  app.use(Logger('dev'));
  app.use(BodyParser.json());
  app.use(BodyParser.urlencoded({extended: false}));
  app.use(Express.static(Path.join(__dirname, 'public')));
}

app.post('/api/mission', function (req, res, next) {
  let item = {
    parentId:req.body.parentId,
    name:req.body.name,
    description:req.body.description,
    type:req.body.type
  };
  res.send(Business.addItem(item));
});

app.put('/api/missions', function (req, res, next) {
  var missionId = req.body.missionId;
  var isDone = req.body.isDone;
  var time = new Date().getTime();
  console.log('put', missionId + isDone);
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

app.get('/api/missionList', function (req, res, next) {
  let condition = req.query.condition;
  console.log(condition);
  Business.getGeneralList(condition)
    .then((list)=>{
    console.log(list);
      res.send(list);
    })

});

app.get('/api/plans', function (req, res, next) {

  var p = req.query;
  console.log(p.isDone);

  Async.auto({
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
        var childNum = child ? child.num : 0;
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
          status: item.status,
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

  let condition = {
    isDone:req.query.isDone,
    type:TYPE_TASK
  };

  Business.getGeneralList(condition)
    .then((list)=>{
    res.send(list);
    })

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

app.get('/api/missions', function (req, res, next) {

  var p = req.query;
  console.log('id', p.isDone);
  if (p.id) {
    Async.auto({
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
              console.log('get_plansxx', missions);
              callback(null, missions);
            });
        },

      },
      function (err, results) {
        var plans = results.get_plans.map(function (item) {
          let child = results.get_child_num.find((n) => n._id.equals(item._id));
          var childNum = child ? child.num : 0;
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
            status: item.status,
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

app.put('/api/missionDel', function (req, res, next) {
  var missionId = req.body.missionId;
  console.log('delete', missionId);

  Mission.findOne({_id: missionId}, function (err, mission) {
    if (err) return next(err);

    if (!mission) {
      return res.status(404).send({message: 'Mission not found.'});
    }
    mission.status = 'DELETED';
    Mission.save(function (err) {
      console.log('delete');
      callback(err);
      return res.send({message: mission.name + ' has been deleted.'});
    });
  });
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