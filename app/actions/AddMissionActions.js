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

  getMissions(){
    var missions = new Array({missionID: "ID001", name: "mission01", description: "", status: true},
      {missionID: "ID001", name: "mission01", description: "", status: true});
    return missions;
	}

}

export default alt.createActions(AddMissionActions);