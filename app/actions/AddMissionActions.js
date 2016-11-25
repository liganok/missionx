import alt from '../alt';

class AddMissionActions {
	constructor() {
		this.generateActions(
			'addMissionSuccess',
			'addMissionFail'
			);
	}

	addMission(missionName){

	}
}

export default alt.createActions(AddMissionActions);