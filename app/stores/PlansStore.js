import alt from '../alt';
import PlansActions from '../actions/PlansActions';
import TaskActions from '../actions/TaskActions';
import AddMissionActions from '../actions/AddMissionActions';

class PlansStore {
  constructor() {
    this.bindActions(PlansActions);
    this.bindAction(AddMissionActions.addMissionSuccess, this.handleAddMissionSuccess);
    this.plans = [];
    this.isDone;
    this.missionId = '';
    this.selection = {todo:true,done:false};
  }

  onGetPlansSuccess(data) {
    this.plans = data;
  }

  onChangeStatus(event) {
    this.isDone = event.target.checked;
    this.missionId = event.target.parentNode.id;
    PlansActions.updateStatus(this.missionId, this.isDone);
  }

  onUpdatePlanSuccess(data) {
    for (var i in this.plans) {
      if (this.plans[i]._id == this.missionId) {
        this.plans[i].isDone = this.isDone;
        if(!(this.selection.todo == true && this.selection.done == true)){
          this.plans.splice(i, 1);
        }
      }
    }
  }

  onUpdateMissionsFail(errorMessage) {
    alert(errorMessage);
  }

  handleUpdateMissionsSuccess(data){
    PlansActions.getMissions();
  }

  handleAddMissionSuccess(data){
    PlansActions.getMissions();
  }

  onSelectToDo(event){
    var toDoCheck = event.target.parentNode.childNodes[0].checked;
    var doneCheck = event.target.parentNode.childNodes[2].checked;
    var isDone;
    this.selection.todo = toDoCheck;

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

    var para = {type:"TASK",isDone:status};
    PlansActions.getPlans(para);
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

    var para = {type:"TASK",isDone:status};
    PlansActions.getPlans(para);
  }

}

export default alt.createStore(PlansStore);