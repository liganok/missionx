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
    this.selection = {todo:true,done:false};
    this.selectionPara = {id:'',isDone:{$in:[true,false]}};
  }

  onGetParentSuccess(data) {
    this.parent = data[0];
  }

  onGetMissionSuccess(data) {
    this.mission = data[0];
    MissionDetailActions.getParent({id:this.mission.parentId});
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
    for (var i in this.subItems) {
      if (this.subItems[i]._id == this.mission.id) {
        this.subItems[i].isDone = this.isDone;
        this.subItems.splice(i, 1);
      }
    }
  }

  handleAddMissionSuccess(data){
    MissionDetailActions.getSubItems(this.selectionPara);
  }

}

export default alt.createStore(MissionDetailStore);