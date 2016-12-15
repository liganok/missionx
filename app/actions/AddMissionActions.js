import alt from '../alt';

class AddMissionActions {
  constructor() {
    this.generateActions(
      'addMissionSuccess',
      'addMissionFail',
      'updateName'
    );
  }

  addMission(para) {
    $.ajax({
      type: 'POST',
      url: '/api/missions',
      data: para
    }).done((data)=>{
      this.actions.addMissionSuccess(data.message);
    }).fail((jqxhr)=>{
      this.actions.addMissionFail(jqxhr.responseJSON.message);
    });
  }

}

export default alt.createActions(AddMissionActions);