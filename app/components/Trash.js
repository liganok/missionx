import React from 'react';
import AddMission from './AddMission';
import List from './List';


class Trash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateFlag:false
    };
  }

  handleSaved(){
    this.setState({updateFlag:true});
  }

  render() {
    return (
      <div>
        <List status={'D'} />
      </div>
    );
  }
}

export default Trash;