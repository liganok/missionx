import React from 'react';
import MissionListStore from '../stores/DoneMissionListStore';
import MissionListActions from '../actions/DoneMissionListActions';

class DoneMissionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = MissionListStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    MissionListStore.listen(this.onChange);
    MissionListActions.getMissions(this.props.type);
  }

  componentWillUnmount() {
    MissionListStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }


  render() {
    let missionList = this.state.missions.map((mission, index) => {
      return (
        <div id={mission._id} className='list-group-item animated fadeIn'>
          <h4 className='media-heading'>
            <input type='checkbox' checked={mission.isDone}
                   onChange={MissionListActions.changeStatus}>    {mission.name}</input>
          </h4>
        </div>
      );
    });

    return (
      <div className='container'>
        <div className="row flipInX animated">
          <div className="col-md-8">
            <div className="panel panel-default">
              <div className='list-group'>
                {missionList}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DoneMissionList;


