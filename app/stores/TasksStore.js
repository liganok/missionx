import alt from '../alt';
import TasksActions from '../actions/TasksActions';
import AddMissionActions from '../actions/AddMissionActions';

class TasksStore {
  constructor() {
    this.bindActions(TasksActions);
    this.bindAction(AddMissionActions.addMissionSuccess, this.handleAddMissionSuccess);
    this.tasks = [];
    this.isDone;
    this.missionId = '';
    this.selection = {todo:true,done:false};
    this.selectionPara = {isDone:{$in:[true,false]}};

  }

  onGetTasksSuccess(data) {
    this.tasks = data;
  }

  onChangeStatus(event) {
    this.isDone = event.target.checked;
    this.missionId = event.target.parentNode.id;
    TasksActions.updateStatus(this.missionId, this.isDone);
  }

  onUpdateTaskSuccess(data) {
    for (var i in this.tasks) {
      if (this.tasks[i]._id == this.missionId) {
        this.tasks[i].isDone = this.isDone;
        if(!(this.selection.todo == true && this.selection.done == true)){
          this.tasks.splice(i, 1);
        }
      }
    }
  }

  onUpdateMissionsFail(errorMessage) {
    alert(errorMessage);
  }

  handleUpdateMissionsSuccess(data){
    TasksActions.getTasks(this.selectionPara);
  }

  handleAddMissionSuccess(data){
    TasksActions.getTasks(this.selectionPara);
  }

  onSelectToDo(event){
    var toDoCheck = event.target.parentNode.childNodes[0].checked;
    var doneCheck = event.target.parentNode.childNodes[2].checked;
    var isDone;
    this.selection.todo = toDoCheck;

    if(toDoCheck && !doneCheck){
      this.selectionPara.isDone = [false,false];
    }

    if(toDoCheck && doneCheck){
      isDone = [false,true];
    }

    if(!toDoCheck && doneCheck){
      isDone = [true,true];
    }

    if(!toDoCheck && !doneCheck){
      isDone = null;
    }
    var status;
    if(isDone){
      status = {$in:isDone}
    }

    this.selectionPara.isDone = status;
    TasksActions.getTasks(this.selectionPara);
  }

  onSelectDone(event){
    var toDoCheck = event.target.parentNode.childNodes[0].checked;
    var doneCheck = event.target.parentNode.childNodes[2].checked;
    var isDone;
    this.selection.done = doneCheck;

    if(toDoCheck && !doneCheck){
      isDone = [false,false];
    }

    if(toDoCheck && doneCheck){
      isDone = [false,true];
    }

    if(!toDoCheck && doneCheck){
      isDone = [true,true];
    }

    if(!toDoCheck && !doneCheck){
      isDone = null;
    }

    var status;
    if(isDone){
      status = {$in:isDone}
    }

    this.selectionPara.isDone = status;
    TasksActions.getTasks(this.selectionPara);
  }

}

export default alt.createStore(TasksStore);