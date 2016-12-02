import alt from '../alt';
import MissionListActions from '../actions/MissionListActions';

class MissionListStore {
  constructor() {
    this.bindActions(MissionListActions);
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
        this.missions.splice(i,1);
      }
    }
  }

  onUpdateMissionsFail(errorMessage) {
    alert(errorMessage);
  }

}

export default alt.createStore(MissionListStore);