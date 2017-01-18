import React from 'react';
import MissionList from './MissionList';

class Home extends React.Component {
  render() {
    return (
      <div>
        <MissionList para = {{type:'PLAN'}}/>
      </div>
    );
  }
}

export default Home;