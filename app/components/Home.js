import React from 'react';
import ToDoMissionList from './ToDoMissionList';
import DoneMissionList from './DoneMissionList';
import AddMission from './AddMission';

class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <AddMission/>
        <div>
          <div className='panel-heading'>To Do</div>
          <ToDoMissionList type='TODO'/>
        </div>
        <div>
          <div className='panel-heading'>Done</div>
          <DoneMissionList type='Done'/>
        </div>
      </div>
    );
  }
}

export default Home;