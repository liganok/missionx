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
}

export default alt.createStore(AddMissionStore);