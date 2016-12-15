import alt from '../alt';
import TaskActions from '../actions/TaskActions';

class TaskStore {
  constructor() {
    this.bindActions(TaskActions);
    this.para = {type:"TASK",isDone:false};
  }


}

export default alt.createStore(TaskStore);