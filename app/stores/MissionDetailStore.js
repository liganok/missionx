import alt from '../alt';
import MissionDetailActions from '../actions/MissionDetailActions';
import AddMissionActions from '../actions/AddMissionActions';

class MissionDetailStore {
  constructor() {
    this.bindActions(MissionDetailActions);
    this.bindAction(AddMissionActions.addMissionSuccess, this.handleAddMissionSuccess);
    this.subItems = [];
    this.isDone;
    this.mission = {};
    this.parent = {};
    this.missionId
    this.selection = {todo: true, done: false};
    this.selectionPara = {id: '', isDone: {$in: [false, false]}};
  }

  onGetParentSuccess(data) {
    this.parent = data[0];
  }

  onGetMissionSuccess(data) {
    this.mission = data[0];
    MissionDetailActions.getParent({id: this.mission.parentId});
  }

  onGetSubItemsSuccess(data) {
    this.subItems = data;
    //alert(JSON.stringify(this.subItems));
  }

  onChangeStatus(event) {
    this.isDone = event.target.checked;
    //alert(this.isDone);
    this.missionId = event.target.parentNode.id;
    MissionDetailActions.updateStatus(this.missionId, this.isDone);
  }

  onUpdateMissionSuccess(data) {
    for (var i in this.subItems) {
      if (this.subItems[i]._id == this.missionId) {
        this.subItems[i].isDone = this.isDone;
        if (!(this.selection.todo == true && this.selection.done == true)) {
          this.subItems.splice(i, 1);
        }
      }
    }
  }

  handleAddMissionSuccess(data) {
    MissionDetailActions.getSubItems(this.selectionPara);
  }

  onSelectToDo(event) {
    var toDoCheck = event.target.parentNode.childNodes[0].checked;
    var doneCheck = event.target.parentNode.childNodes[2].checked;
    var isDone;
    this.selection.todo = toDoCheck;

    if (toDoCheck && !doneCheck) {
      isDone = [false, false];
    }

    if (toDoCheck && doneCheck) {
      isDone = [false, true];
    }

    if (!toDoCheck && doneCheck) {
      isDone = [true, true];
    }

    if (!toDoCheck && !doneCheck) {
      isDone = null;
    }
    var status;
    if (isDone) {
      status = {$in: isDone}
    }

    this.selectionPara.isDone = status;
    MissionDetailActions.getSubItems(this.selectionPara);
  }

  onSelectDone(event) {
    var toDoCheck = event.target.parentNode.childNodes[0].checked;
    var doneCheck = event.target.parentNode.childNodes[2].checked;
    var isDone;
    this.selection.done = doneCheck;

    if (toDoCheck && !doneCheck) {
      isDone = [false, false];
    }

    if (toDoCheck && doneCheck) {
      isDone = [false, true];
    }

    if (!toDoCheck && doneCheck) {
      isDone = [true, true];
    }

    if (!toDoCheck && !doneCheck) {
      isDone = null;
    }

    var status;
    if (isDone) {
      status = {$in: isDone}
    }

    this.selectionPara.isDone = status;
    MissionDetailActions.getSubItems(this.selectionPara);
  }

  onDeleteMission(event){
    alert('test');
    MissionDetailActions.deleteMission({missionId:this.mission._id});
  }

  onDeleteMissionSuccess(data){
    alert('delete success');
  }
  onDeleteMissionFail(data){}

}

export default alt.createStore(MissionDetailStore);