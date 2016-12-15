import alt from '../alt';
import TaskActions from '../actions/TaskActions';

class TaskStore {
  constructor() {
    this.bindActions(TaskActions);
    this.para = {type:"TASK",isDone:false};
  }

  onGetToDo(event){

    this.para = {type:"TASK",isDone:false};
  }

  onGetDone(event){
    this.para = {type:"TASK",isDone:true};
  }

}

export default alt.createStore(TaskStore);