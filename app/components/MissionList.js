import React from 'react';
import MissionListStore from '../stores/MissionListStore';
import MissionListActions from '../actions/MissionListActions';

class MissionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = MissionListStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    MissionListStore.listen(this.onChange);
    MissionListActions.getMissions();
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
        <div key={mission._id} className='list-group-item animated fadeIn'>
          <div className='media-body'>
            <h4 className='media-heading'>
              {mission.name}
            </h4>
          </div>
        </div>
      );
    });

    return (
      <div className='container'>
        <div className='list-group'>
          {missionList}
        </div>
      </div>
    );
  }
}

export default MissionList;


