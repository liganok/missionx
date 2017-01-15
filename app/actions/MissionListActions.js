import alt from '../alt';

class MissionListActions {
  constructor() {
    this.generateActions(
      'getListSuccess',
      'getListFail',
      'updateIsDoneSuccess',
      'updateIsDoneFail',
      'updateIsDone',
      'selectTodo',
      'selectDone'
    );
  }

  getList(para) {
    $.ajax({
      type: 'GET',
      url: '/api/missionList',
      data:para
    }).done((data)=> {
      this.actions.getMissionsSuccess(data);
    }).fail((jqxhr)=> {
      this.actions.getMissionsFail(jqxhr.responseJSON.message);
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

export default alt.createActions(MissionListActions);