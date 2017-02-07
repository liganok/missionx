import alt from '../alt';
import MissionListActions from '../actions/MissionListActions';
import TaskActions from '../actions/TasksActions';
import AddMissionActions from '../actions/AddMissionActions';

class MissionListStore {
  constructor() {
    this.bindActions(MissionListActions);
    //this.bindAction(AddMissionActions.addMissionSuccess, this.handleAddMissionSuccess);
    this.list = [];
    this.item = {};
    //this.selection = {todo:true,done:false};
    this.selectionPara = {isDone:{$in:[false,false]}};
    this.data = {};
    this.uiContral = {};
    this.selection ={};

  }

  static initMissionStore(props){

    let isDone;
    let todoStatus = props.checkbox.status.todo;
    let doneStatus = props.checkbox.status.done;
    if(todoStatus && doneStatus) isDone = {$in:[true,false]};
    if(todoStatus && !doneStatus) isDone = {$in:[false,false]};
    if(!todoStatus && doneStatus) isDone = {$in:[true,true]};
    if(!todoStatus && !doneStatus) isDone = null;

    this.selection = {
      _id:props._id,
      parentId: props.parentId,
      type:props.type,
      isDone:isDone
    };

    this.uiContral = {
      checkbox:{status:{todo:todoStatus,done:doneStatus}}
    };
  }

  static initMissionStore2(){
    alert(JSON.stringify(this.selection));
  }

  onGetListSuccess(data) {
    this.list = data;
  }

  onUpdateisDone(event) {
    this.isDone = event.target.checked;
    this.missionId = event.target.parentNode.parentNode.id;
    MissionListActions.updateStatus(this.missionId, this.isDone);
  }

  onUpdateisDoneSuccess(data) {

  }

  onUpdateisDoneFail(errorMessage) {
    alert(errorMessage);
  }

  handleUpdateMissionsSuccess(data){
    MissionListActions.getMissions();
  }

  handleAddMissionSuccess(data){
    MissionListActions.getMissions();
  }

  onSelectToDo(event){
    var toDoCheck = event.target.parentNode.childNodes[0].checked;
    var doneCheck = event.target.parentNode.childNodes[2].checked;
    var isDone;

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
    MissionListActions.getList(para);
  }

  onSelectDone(event){
    var toDoCheck = event.target.parentNode.childNodes[0].checked;
    var doneCheck = event.target.parentNode.childNodes[2].checked;
    var isDone;

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
    MissionListActions.getList(para);
  }

  onIsDoneChange(event){
    alert('test2  '+JSON.stringify(event.target.value.type));
    this.selection.todo = event.target.checked;
    //alert(event.target.checked);
  }

}

export default alt.createStore(MissionListStore);