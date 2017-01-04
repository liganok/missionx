import alt from '../alt';

class TasksActions {
  constructor() {
    this.generateActions(
      'getTasksSuccess',
      'getTasksFail',
      'updateTaskSuccess',
      'updateTaskFail',
      'changeStatus',
      'selectToDo',
      'selectDone'
    );
  }

  getTasks(para) {
    $.ajax({
      type: 'GET',
      url: '/api/tasks',
      data:para
    }).done((data)=> {
      this.actions.getTasksSuccess(data);
    }).fail((jqxhr)=> {
      this.actions.getTasksFail(jqxhr.responseJSON.message);
    });
  }

  updateStatus(missionId,isDone){
    $.ajax({
      type: 'PUT',
      url: '/api/missions',
      data: {isDone:isDone, missionId:missionId}
    }).done((data)=>{
      this.actions.updateTaskSuccess(data);
    }).fail((jqxhr)=>{
      this.actions.updateTaskFail(jqxhr.responseJSON.message);
    });
  }


}

export default alt.createActions(TasksActions);