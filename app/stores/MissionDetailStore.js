import alt from '../alt';
import MissionDetailActions from '../actions/MissionDetailActions';
import TaskActions from '../actions/TaskActions';
import AddMissionActions from '../actions/AddMissionActions';

class MissionDetailStore {
  constructor() {
    this.bindActions(MissionDetailActions);
    this.bindActions(TaskActions);
    this.bindAction(AddMissionActions.addMissionSuccess, this.handleAddMissionSuccess);
    this.missions = [];
    this.isDone;
    this.missionId = '';
  }

  onGetMissionsSuccess(data) {
    this.missions = data;
  }

  onChangeStatus(event) {
    this.isDone = event.target.checked;
    this.missionId = event.target.parentNode.parentNode.id;
    MissionDetailActions.updateStatus(this.missionId, this.isDone);
  }

  onUpdateMissionsSuccess(data) {
    for (var i in this.missions) {
      if (this.missions[i]._id == this.missionId) {
        this.missions[i].isDone = this.isDone;
        this.missions.splice(i, 1);
      }
    }
  }

  onUpdateMissionsFail(errorMessage) {
    alert(errorMessage);
  }

  handleUpdateMissionsSuccess(data){
    MissionDetailActions.getMissions();
  }

  handleAddMissionSuccess(data){
    MissionDetailActions.getMissions();
  }

  onGetToDo(event){
    var para = {type:"TASK",isDone:false};
    MissionDetailActions.getMissions(para);
  }

  onGetDone(event){
    var para = {type:"TASK",isDone:true};
    MissionDetailActions.getMissions(para);
  }

}

export default alt.createStore(MissionDetailStore);