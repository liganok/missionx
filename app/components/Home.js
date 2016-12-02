import React from 'react';
import ToDoMissionList from './ToDoMissionList';
import DoneMissionList from './DoneMissionList';
import AddMission from './AddMission';

class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <AddMission/>
        <ToDoMissionList type='TODO'/>
        <DoneMissionList type='Done'/>
      </div>
    );
  }
}

export default Home;