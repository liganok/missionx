import alt from '../alt';
import MissionDetailActions from '../actions/MissionDetailActions';
import AddMissionActions from '../actions/AddMissionActions';

class MissionDetailStore {
  constructor() {
    this.bindActions(MissionDetailActions);
    this.bindAction(AddMissionActions.addMissionSuccess, this.handleAddMissionSuccess);
    this.subItems=[];
    this.isDone;
    this.mission={};
    this.parent={};
  }

  handleAddMissionSuccess(data){
  }

  onGetParentSuccess(data) {
    this.parent = data;
  }

  onGetMissionSuccess(data) {
    this.mission = data[0];
  }

  onGetSubItemsSuccess(data) {
    this.subItems = data;
  }

  onChangeStatus(event) {
    this.isDone = event.target.checked;
    this.missionId = event.target.parentNode.parentNode.id;
    MissionDetailActions.updateStatus(this.missionId, this.isDone);
  }

  onUpdateMissionsSuccess(data) {
    for (var i in this.missions) {
      if (this.missions[i]._id == this.missionId) {
        this.missions[i].isDone = this.isDone;
        this.missions.splice(i, 1);
      }
    }
  }

}

export default alt.createStore(MissionDetailStore);