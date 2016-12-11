import React from 'react';
import ToDoMissionList from './ToDoMissionList';
import DoneMissionList from './DoneMissionList';
import AddMission from './AddMission';

class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {subcom:<ToDoMissionList/>};
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  onChange(state) {
    this.setState(state);
  }

  handleToDo(event){
    this.state.subcom = <ToDoMissionList/>;
    alert(this.state.subcom);
  }

  handleDone(event){
    this.state.type = <DoneMissionList/>;
    alert(this.state.subcom);
  }

  render() {
    return (
      <div>
        <div className="btn-group" role="group">
          <button type="button" className="btn btn-default" aria-label="..." onClick={this.state.subcom = <ToDoMissionList/>}>To Do</button>
          <button type="button" className="btn btn-default" aria-label="..." onClick={this.state.subcom = <DoneMissionList/>}>Done</button>
        </div>
        {this.state.subcom}
      </div>
    );
  }
}

export default Tasks;