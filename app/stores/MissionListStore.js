import alt from '../alt';
import MissionListActions from '../actions/MissionListActions';

class MissionListStore {
  constructor() {
    this.bindActions(MissionListActions);
    this.missions = [];
    this.missionId = '';
    this.isDone = '';
  }

  onGetMissionsSuccess(data) {
    this.missions = data;
  }

  onUpdateStatus(event) {
    this.isDone = event.target.value;
    alert(this.isDone);
}

}

export default alt.createStore(MissionListStore);