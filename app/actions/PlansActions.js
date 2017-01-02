import alt from '../alt';

class PlansActions {
  constructor() {
    this.generateActions(
      'getPlansSuccess',
      'getPlansFail',
      'updatePlanSuccess',
      'updatePlanFail',
      'changeStatus',
      'selectToDo',
      'selectDone'
    );
  }

  getPlans(para) {
    $.ajax({
      type: 'GET',
      url: '/api/plans',
      data:para
    }).done((data)=> {
      this.actions.getPlansSuccess(data);
    }).fail((jqxhr)=> {
      this.actions.getPlansFail(jqxhr.responseJSON.message);
    });
  }

  updateStatus(missionId,isDone){
    $.ajax({
      type: 'PUT',
      url: '/api/missions',
      data: {isDone:isDone, missionId:missionId}
    }).done((data)=>{
      this.actions.updatePlanSuccess(data);
    }).fail((jqxhr)=>{
      this.actions.updatePlanFail(jqxhr.responseJSON.message);
    });
  }


}

export default alt.createActions(PlansActions);