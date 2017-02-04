'use strict';
import {TYPE_INBOX,TYPE_TASK,TYPE_PLAN } from '../Const';
import Utils from '../Utils';

class Business{

  static getPlanList(){
    return Utils.saveMission({});
  }

  static getTaskList(){

  }

  static getPlan(){

  }

  static getTask(){
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