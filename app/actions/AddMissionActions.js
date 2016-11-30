import alt from '../alt';

class AddMissionActions {
  constructor() {
    this.generateActions(
      'addMissionSuccess',
      'addMissionFail',
      'getMissionsSuccess',
      'getMissionsFail',
      'updateName'
    );
  }

  addMission(name) {
    $.ajax({
      type: 'POST',
      url: '/api/missions',
      data: {name:name}
    }).done((data)=>{
      this.actions.addMissionSuccess(data.message);
    }).fail((jqxhr)=>{
      this.actions.addMissionFail(jqxhr.responseJSON.message);
    });
  }

  getMissions() {
    /*var missions = new Array({missionID: "ID001", name: "mission01", description: "", status: true},
      {missionID: "ID002", name: "mission02", description: "", status: true},
      {missionID: "ID003", name: "mission03", description: "", status: true},
      {missionID: "ID004", name: "mission04", description: "", status: true});*/
    let url = '/api/missions';
    let params = {};

    $.ajax({
      type: 'GET',
      url: '/api/missions',
      data: params
    }).done((data)=>{
      this.actions.getMissionsSuccess(data);
    }).fail((jqxhr)=>{
      this.actions.getMissionsFail(jqxhr.responseJSON.message);
    });
  }

}

export default alt.createActions(AddMissionActions);