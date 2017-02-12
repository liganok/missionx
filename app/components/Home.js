import React from 'react';
import List from './List';
import ListItem from './ListItem';
import AddMission from './AddMission';


class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      updateFlag:false
    };
  }

  handleSaved(){
    this.setState({updateFlag:true});
    alert('test');
  }

  render() {
    return (
      <div>
        <AddMission onSaved={this.handleSaved.bind(this)}/>
        <List updateFlag={this.state.updateFlag}/>
        <ListItem id="test" checked={this.state.checked} name="test"/>
      </div>
    );
  }
}

export default Home;