import alt from '../alt';

class MissionListActions {
  constructor() {
    this.generateActions(
      'getMissionsSuccess',
      'getMissionsFail',
      'updateMissionsSuccess',
      'updateMissionsFail',
      'changeStatus'
    );
  }

  getMissions(type) {
    /*var missions = new Array({missionID: "ID001", name: "mission01", description: "", status: true},
     {missionID: "ID002", name: "mission02", description: "", status: true},
     {missionID: "ID003", name: "mission03", description: "", status: true},
     {missionID: "ID004", name: "mission04", description: "", status: true});*/
    $.ajax({
      type: 'GET',
      url: '/api/missions',
      data:{type:type}
    }).done((data)=> {
      this.actions.getMissionsSuccess(data);
    }).fail((jqxhr)=> {
      this.actions.getMissionsFail(jqxhr.responseJSON.message);
    });
  }

  updateStatus(missionId,isDone){
    $.ajax({
      type: 'PUT',
      url: '/api/missions',
      data: {isDone:isDone, missionId:missionId}
    }).done((data)=>{
      this.actions.updateMissionsSuccess(data.message);
    }).fail((jqxhr)=>{
      this.actions.updateMissionsFail(jqxhr.responseJSON.message);
    });
  }


}

export default alt.createActions(MissionListActions);