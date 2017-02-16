'use strict';
import Async from 'async';
import {TYPE_INBOX, TYPE_TASK, TYPE_PLAN} from '../Const';
import Utils from '../Utils';

class Business {

  static getPlanList() {
    return Utils.findMissionList({type: TYPE_PLAN});
  }

  static getTaskList() {
    return Utils.findMissionList({type: TYPE_TASK});
  }

  static getGeneralList(condition) {
    //return Utils.findMissionList(condition);
    let list=[];
    async function f() {
      let listPromise = Utils.findMissionList(condition);
      let countListAllPromise;
      let countListDonePromise;
      await listPromise.then((data)=>{
        list = data;
        let idArr = data.map((item)=>{return item._id});
        let groupCondition = {_id: '$parentId', num: {$sum: 1}};
        countListAllPromise =  Utils.count({match:{parentId: {$in: idArr}},group:groupCondition});
        countListDonePromise =  Utils.count({match:{parentId: {$in: idArr},isDone:true},group:groupCondition});
      });
      await countListAllPromise.then((data)=>{
        list = list.map((item)=>{
          let newItem=item.toJSON();
          let childNum = data.find((n)=>n._id.equals(item._id)).num;
          Object.assign(newItem,{childNum:childNum});
          console.log(newItem);

          return newItem;
        });
      });
      console.log(list);
      return list;
    }
    return f();
  }

  static getItemWithSubList(id) {
    async function f() {
      let item = await Utils.findMissionList({_id: id});
      let subList = await Utils.findMissionList({parentId: id});
      return {item: item, subList: subList};
    }

    return f();
  }


  static addItem(item) {
    async function f() {
      let currentItemPromise = Utils.saveMission(item);
      let parentPromise = Utils.findMissionList({_id: item.parentId});
      await parentPromise.then((data) => {
        let parentMission = data[0];
        if (parentMission.type == 'TASK') {
          parentMission.type = 'PLAN';
          parentPromise = parentMission.save();
        }
      });
      return [currentItemPromise, parentPromise];
    }

    return f();
  }

  static updateItem(item) {
    return Utils.updateMission(item);
  }


  static deletePlan() {

  }

  static removeTask() {
    return Utils.removeMission({_id: "58959e44fef49f1874a5b974"});
  }
}

export default Business;