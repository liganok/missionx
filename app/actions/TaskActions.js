import alt from '../alt';

class TaskActions {
  constructor() {
    this.generateActions(
      'selectToDo',
      'selectDone'
    );
  }

}

export default alt.createActions(TaskActions);