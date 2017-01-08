import alt from '../alt';
import PlansActions from '../actions/PlansActions';
import TaskActions from '../actions/TasksActions';
import AddMissionActions from '../actions/AddMissionActions';

class PlansStore {
  constructor() {
    this.bindActions(PlansActions);
    this.bindAction(AddMissionActions.addMissionSuccess, this.handleAddMissionSuccess);
    this.plans = [];
    this.isDone;
    this.missionId = '';
    this.selection = {todo:true,done:false};
    this.selectionPara = {isDone:{$in:[false,false]}};

  }

  onGetPlansSuccess(data) {
    this.plans = data;
    //alert(JSON.stringify(this.plans));
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
    PlansActions.getPlans(this.selectionPara);
  }

  handleAddMissionSuccess(data){
    PlansActions.getPlans(this.selectionPara);
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

    this.selectionPara.isDone = status;
    PlansActions.getPlans(this.selectionPara);
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
    PlansActions.getPlans(this.selectionPara);
  }

}

export default alt.createStore(PlansStore);