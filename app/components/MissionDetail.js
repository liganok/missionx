import React from 'react';
import AddMission from './AddMission';
import {Checkbox} from "@blueprintjs/core";

class MissionDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      updateFlag:false
    };
  }

  componentDidMount() {

  }

  componentWillUnmount() {
  }

  onChange(state) {
    this.setState(state);
  }

  handleSaved(){
    this.setState({updateFlag:true});
  }


  render() {

    return (
      <div>
        <a href={"../detail/" + this.state.parent._id}>{this.state.parent.name ? this.state.parent.name + '>' : '>'}</a>
        <div className="pull-right">
          <button type="button" className="btn-link">Edit</button>
          <button type="button" className="btn-link" onClick={MissionDetailActions.deleteMission}>Delete
          </button>
        </div>
        <div className="nav nav-list nav-divider">
          <li className="nav-divider"></li>
        </div>
        <div className="headbox">
          <Checkbox lable ={this.state.mission.name}>
            {this.state.mission.name}
          </Checkbox>
        </div>

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


