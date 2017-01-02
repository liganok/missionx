import alt from '../alt';
import TaskActions from '../actions/TaskActions';

class TaskStore {
  constructor() {
    this.bindActions(TaskActions);
    this.selection = {todo:true,done:false};
  }

  onSelectToDo(event){
    this.selection.todo = event.target.checked;
  }

  onSelectDone(event){
    this.selection.done = event.target.checked;
  }


}

export default alt.createStore(TaskStore);