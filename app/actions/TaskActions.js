import alt from '../alt';

class TaskActions {
  constructor() {
    this.generateActions(
      'getToDo',
      'getDone'
    );
  }

}

export default alt.createActions(TaskActions);