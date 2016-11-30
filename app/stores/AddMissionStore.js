import alt from '../alt';
import AddMissionActions from '../actions/AddMissionActions';

class AddMissionStore {
  constructor() {
    this.bindActions(AddMissionActions);
    this.name = '';
    this.missions = [];
  }

  onAddMissionSuccess(successMessage) {
    //AddMissionActions.getMissions();
  }

  onGetMissionsSuccess(data) {
    this.missions = data;
  }

  onUpdateName(event) {
    this.name = event.target.value;
  }
}

export default alt.createStore(AddMissionStore);