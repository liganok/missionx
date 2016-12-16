import React from 'react';
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
    MissionDetailActions.getMissions(para);
  }

  componentWillUnmount() {
    MissionDetailStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }


  render() {
    let MissionDetail = this.state.missions.map((mission, index) => {
      return (
        <div key={mission._id} id={mission._id} className='list-group-item animated fadeIn'>
          <h4 className='media-heading'>
            <input type='checkbox' checked={mission.isDone}
                   onChange={MissionDetailActions.changeStatus}>   {mission.name}</input>
          </h4>
        </div>
      );
    });

    return (
      <div className='container'>
        <AddMission para={{type:"TASK",parentId:this.props.params.id}}/>
        <div className="row flipInX">
          <div className="col-md-8">
            <div className="panel panel-default">
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


