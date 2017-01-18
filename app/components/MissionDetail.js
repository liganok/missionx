import React from 'react';
import {Link} from 'react-router';
import MissionDetailStore from '../stores/MissionDetailStore';
import MissionDetailActions from '../actions/MissionDetailActions';
import AddMission from './AddMission';

class MissionDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = MissionDetailStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    MissionDetailStore.listen(this.onChange);
    this.state.selectionPara.id = this.props.params.id;
    MissionDetailActions.getMission(this.state.selectionPara);
    MissionDetailActions.getSubItems(this.state.selectionPara);

  }

  componentWillUnmount() {
    MissionDetailStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }


  render() {
    let MissionDetail = this.state.subItems.map((mission, index) => {
      return (
        <div key={mission._id} id={mission._id} className='list-group-item animated fadeIn'>
          <input type='checkbox' checked={mission.isDone}
                 onChange={MissionDetailActions.changeStatus}/>
          <a href={"../detail/" + mission._id}><span className="H5" style={{marginLeft: 4}}>{mission.name}</span></a>
          {mission.childNum > 0 ? <span className="badge">{mission.childNumDone}/{mission.childNum}</span>:''}
        </div>
      );
    });

    return (
      <div>
        <a href={"../detail/" + this.state.parent._id}>{this.state.parent.name ? this.state.parent.name + '>' : '>'}</a>
        <div className="pull-right">
          <button type="button" className="btn-link">Edit</button>
          <button type="button" className="btn-link" onClick={MissionDetailActions.deleteMission}>Delete</button>
        </div>
        <div className="nav nav-list nav-divider">
          <li className="nav-divider"></li>
        </div>
        <div className="headbox">
          <input type="checkbox"/>
          <span style={{marginLeft: 4}}>{this.state.mission.name}</span>
          {/*<span className="badge pull-right">11/20</span>*/}
          <small>{this.state.mission.name}</small>
        </div>

        <div>
          <small>Sub items</small>
          <div className="">
            <AddMission para={{type: "TASK", parentId: this.props.params.id}}/>
            <div className="" style={{marginTop: 5}}>
              <input type="checkbox" checked={this.state.selection.todo} onChange={MissionDetailActions.selectToDo}/>
              <span style={{marginRight: 5}}><small> To Do</small></span>
              <input type="checkbox" checked={this.state.selection.done} onChange={MissionDetailActions.selectDone}/>
              <span><small> Done</small></span>
            </div>
            <div style={{marginTop: 2}}>
              <div className='list-group'>
                {MissionDetail}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MissionDetail;


