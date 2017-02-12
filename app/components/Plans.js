import React from 'react';
import AddMission from './AddMission';
import List from './List';


class Plans extends React.Component {
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
        <AddMission type={'PLAN'} onSaved={this.handleSaved.bind(this)}/>
        <List type={'PLAN'} updateFlag={this.state.updateFlag}/>
      </div>
    );
  }
}

export default Plans;