import alt from '../alt';
import MissionListActions from '../actions/MissionListActions';
import DoneMissionListActions from '../actions/DoneMissionListActions';
import AddMissionActions from '../actions/AddMissionActions';

class MissionListStore {
  constructor() {
    this.bindActions(MissionListActions);
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
    MissionListActions.updateStatus(this.missionId, this.isDone);
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
    MissionListActions.getMissions();
  }

  handleAddMissionSuccess(data){
    MissionListActions.getMissions();
  }

}

export default alt.createStore(MissionListStore);