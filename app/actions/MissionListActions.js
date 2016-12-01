import alt from '../alt';

class MissionListActions {
  constructor() {
    this.generateActions(
      'getMissionsSuccess',
      'getMissionsFail',
      'updateStatus'
    );
  }

  getMissions() {
    /*var missions = new Array({missionID: "ID001", name: "mission01", description: "", status: true},
     {missionID: "ID002", name: "mission02", description: "", status: true},
     {missionID: "ID003", name: "mission03", description: "", status: true},
     {missionID: "ID004", name: "mission04", description: "", status: true});*/
    $.ajax({
      type: 'GET',
      url: '/api/missions'
    }).done((data)=> {
      this.actions.getMissionsSuccess(data);
    }).fail((jqxhr)=> {
      this.actions.getMissionsFail(jqxhr.responseJSON.message);
    });
  }

}

export default alt.createActions(MissionListActions);