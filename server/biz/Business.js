'use strict';
import Async from 'async';
import {TYPE_INBOX,TYPE_TASK,TYPE_PLAN } from '../Const';
import Utils from '../Utils';

class Business{

  static getPlanList(){
    return Utils.findMissionList({type:TYPE_PLAN});
  }

  static getTaskList(){
    return Utils.findMissionList({type:TYPE_TASK});
  }

  static getGeneralList(condition){
    return Utils.findMissionList(condition);
  }

  static getItemWithSubList(id){
    async function f() {
      let item = await Utils.findMissionList({_id:id});
      let subList = await Utils.findMissionList({parentId:id});
      return {item:item,subList:subList};
    }
    return f();
  }


  static addItem(item) {
    async function f() {
      let currentItemPromise = Utils.saveMission(item);
      let parentItemPromise = async function () {
        let parent = await Utils.findMissionList({_id: item.parentId})[0];
        console.log('parent',JSON.stringify(parent));
        if (parent.type == 'TASK') {
          parent.type = 'PLAN';
          return  parent.save();
        };
      };
      let currentItem = await currentItemPromise;
      let parentItem = await parentItemPromise;
      return parentItem;
    }
    return f();
  }

  static updateItem(item){
    return Utils.updateMission(item);
  }


  static deletePlan(){

  }

  static removeTask(){
    return Utils.removeMission({_id:"58959e44fef49f1874a5b974"});
  }
}

export default Business;