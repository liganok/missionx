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
      'selectDone'
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
    $.ajax({
      type: 'PUT',
      url: '/api/missions',
      data: {isDone:isDone, missionId:missionId}
    }).done((data)=>{
      this.actions.updateMissionsSuccess(data);
    }).fail((jqxhr)=>{
      this.actions.updateMissionsFail(jqxhr.responseJSON.message);
    });
  }


}

export default alt.createActions(MissionDetailActions);