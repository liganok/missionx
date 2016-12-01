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
    this.isDone = event.target.checked;
    //alert(event.target.id);
    alert(event.target.parentNode.parentNode.className);
}

}

export default alt.createStore(MissionListStore);