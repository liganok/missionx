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


  static addItem(item){
    return Utils.saveMission(item);

  }

  static updatePlan(){

  }

  static updateTask(){
    return Utils.updateMission({_id:"589593356b5e48170c02a3b7",name:'hello world3',type: TYPE_TASK});
  }

  static deletePlan(){

  }

  static removeTask(){
    return Utils.removeMission({_id:"58959e44fef49f1874a5b974"});
  }
}

export default Business;