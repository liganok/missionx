import React from 'react';
import AddMission from './AddMission';
import ItemDetail from './ItemDetail';
import List from './List';

class MissionDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      updateFlag:false
    };
  }


  handleSaved(){
    this.setState({updateFlag:true});
  }


  render() {

    return (
      <div>
        <ItemDetail id={this.props.id}/>
        <div>
          <small>Sub items</small>
          <AddMission type={'TASK'} parentId={this.props.id} onSaved={this.handleSaved.bind(this)}/>
          <List parentId={this.props.id} updateFlag={this.state.updateFlag}/>
        </div>
      </div>
    );
  }
}

export default MissionDetail;


