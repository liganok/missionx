import React from 'react';
import MissionList from './MissionList';

class Home extends React.Component {
  render() {
    return (
      <div>
        <MissionList type = {'TASK'} checkbox={{status:{todo:true,done:false}}}/>
      </div>
    );
  }
}

export default Home;