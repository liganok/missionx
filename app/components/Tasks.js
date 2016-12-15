import React from 'react';
import ToDoMissionList from './ToDoMissionList';
import DoneMissionList from './DoneMissionList';
import AddMission from './AddMission';

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {subCom:<ToDoMissionList/>};
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  onChange(state) {
    this.setState(state);
  }

  handleToDo(){
    this.setState({subCom:<ToDoMissionList/>});
  }

  handleDone(){
    this.setState({subCom:<DoneMissionList/>});
  }

  render() {
    return (
      <div>
        <AddMission type="TASK"/>
        <div className="col-sm-offset-9">
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-default" aria-label="..." onClick={this.handleToDo.bind(this)}>To Do</button>
            <button type="button" className="btn btn-default" aria-label="..." onClick={this.handleDone.bind(this)}>Done</button>
          </div>
        </div>
        <div>
          {this.state.subCom}
        </div>
      </div>
    );
  }
}

export default Tasks;