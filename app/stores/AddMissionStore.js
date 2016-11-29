import alt from '../alt';
import AddMissionActions from '../actions/AddMissionActions';

class AddMissionStore { 
	constructor(){
		this.bindActions(AddMissionActions);
		this.missionName = '';
		this.missions = [];
	}

	onAddMissionSuccess(successMessage) {

	}

  onUpdateName(event) {
    this.name = event.target.value;
    this.nameValidationState = '';
    this.helpBlock = '';
  }
}

export default alt.createStore(AddMissionStore);