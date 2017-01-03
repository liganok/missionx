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
    var para = this.props.params;
    para.isDone = false;
    MissionDetailActions.getMission(para);
    MissionDetailActions.getSubItems(para);

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
          <h4 className='media-heading'>
            <input type='checkbox' checked={mission.isDone}
                   onChange={MissionDetailActions.changeStatus}/>
            <a href={"../detail/" + mission._id}><span className="H5" style={{marginLeft: 4}}>{mission.name}</span></a>
          </h4>
        </div>
      );
    });

    return (
      <div>
        <a href={"../detail/"+this.props.params.id}>{this.props.params.id} ></a>
        <div className="pull-right">
          <button type="button" className="btn-link">Edit</button>
          <button type="button" className="btn-link">Delete</button>
        </div>
        <ul className="nav nav-list nav-divider">
          <li className="nav-divider"></li>
        </ul>
        <blockquote>
          <input type="checkbox"/>
          {this.state.mission.name}
          <span className="badge pull-right">11/20</span>
          <small> {this.state.mission.name}</small>
        </blockquote>

        <div>
          <small>Sub items</small>
          <div className="well">
            <AddMission para={{type:"TASK",parentId:this.props.params.id}}/>
            <div className="">
              <input type="checkbox" checked="true"/> <span><small>To Do</small></span>
              <input type="checkbox"/> <span><small>Done</small></span>
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


