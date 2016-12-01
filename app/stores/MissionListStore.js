import alt from '../alt';
import MissionListActions from '../actions/MissionListActions';

class MissionListStore {
  constructor() {
    this.bindActions(MissionListActions);
    this.missions = [];
  }

  onGetMissionsSuccess(data) {
    this.missions = data;
  }

}

export default alt.createStore(MissionListStore);