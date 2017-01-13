import alt from '../alt';

class MissionDetailActions {
  constructor() {
    this.generateActions(
      'getParentSuccess',
      'getParentFail',
      'getMissionSuccess',
      'getMissionFail',
      'getSubItemsSuccess',
      'getSubItemsFail',
      'updateMissionSuccess',
      'updateMissionFail',
      'changeStatus',
      'selectToDo',
      'selectDone',
      'deleteMission',
      'deleteMissionSuccess',
      'deleteMissionFail',
      'editMission'
    );
  }

  getParent(para) {
    $.ajax({
      type: 'GET',
      url: '/api/mission',
      data:para
    }).done((data)=> {
      this.actions.getParentSuccess(data);
    }).fail((jqxhr)=> {
      this.actions.getParentFail(jqxhr.responseJSON.message);
    });
  }

  getMission(para) {
    $.ajax({
      type: 'GET',
      url: '/api/mission',
      data:para
    }).done((data)=> {
      this.actions.getMissionSuccess(data);
    }).fail((jqxhr)=> {
      this.actions.getMissionFail(jqxhr.responseJSON.message);
    });
  }

  getSubItems(para) {
    $.ajax({
      type: 'GET',
      url: '/api/missions',
      data:para
    }).done((data)=> {
      this.actions.getSubItemsSuccess(data);
    }).fail((jqxhr)=> {
      this.actions.getSubItemsFail(jqxhr.responseJSON.message);
    });
  }

  updateStatus(missionId,isDone){
    alert('test2');
    $.ajax({
      type: 'PUT',
      url: '/api/missions',
      data: {isDone:isDone, missionId:missionId}
    }).done((data)=>{
      this.actions.updateMissionSuccess(data);
    }).fail((jqxhr)=>{
      this.actions.updateMissionFail(jqxhr.responseJSON.message);
    });
  }

  deleteMission(para){
    alert('test2');
    $.ajax({
      type: 'PUT',
      url: '/api/missionDel',
      data:para
    }).done((data)=> {
      this.actions.deleteMissionSuccess(data);
    }).fail((jqxhr)=> {
      this.actions.deleteMissionFail(jqxhr.responseJSON.message);
    });
  }


}

export default alt.createActions(MissionDetailActions);