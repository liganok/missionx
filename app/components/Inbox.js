import React from 'react';
import AddMission from './AddMission';
import List from './List';


class Inbox extends React.Component {
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
        <AddMission type={'INBOX'} onSaved={this.handleSaved.bind(this)}/>
        <List type={'INBOX'} updateFlag={this.state.updateFlag}/>
      </div>
    );
  }
}

export default Inbox;