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
      'selectDone',
      'isDoneChange'
    );
  }

  getList(para) {
    $.ajax({
      type: 'GET',
      url: '/api/missionList',
      data:{'condition':para}
    }).done((data)=> {
      this.actions.getListSuccess(data);
    }).fail((jqxhr)=> {
      this.actions.getListFail(jqxhr.responseJSON.message);
    });
  }

  updateStatus(missionId,isDone){
    $.ajax({
      type: 'PUT',
      url: '/api/mission',
      data: {isDone:isDone, missionId:missionId}
    }).done((data)=>{
      this.actions.updateIsDoneSuccess(data);
    }).fail((jqxhr)=>{
      this.actions.updateIsDoneFail(jqxhr.responseJSON.message);
    });
  }


}

export default alt.createActions(MissionListActions);