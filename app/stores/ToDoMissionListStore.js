import alt from '../alt';
import ToDoMissionListActions from '../actions/ToDoMissionListActions';
import DoneMissionListActions from '../actions/DoneMissionListActions';
import AddMissionActions from '../actions/AddMissionActions';

class ToDoMissionListStore {
  constructor() {
    this.bindActions(ToDoMissionListActions);
    this.bindAction(DoneMissionListActions.updateMissionsSuccess, this.handleUpdateMissionsSuccess);
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
    ToDoMissionListActions.updateStatus(this.missionId, this.isDone);
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
    ToDoMissionListActions.getMissions();
  }

  handleAddMissionSuccess(data){
    ToDoMissionListActions.getMissions();
  }

}

export default alt.createStore(ToDoMissionListStore);