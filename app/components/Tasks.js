import React from 'react';
import MissionList from './MissionList';
import TaskStore from '../stores/TaskStore';
import TaskActions from '../actions/TaskActions';
import AddMission from './AddMission';


class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = TaskStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    TaskStore.listen(this.onChange);
  }

  componentWillUnmount() {
    TaskStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    //console.log("test+"+this.state.para.type+"isdone"+this.state.para.isDone);
    return (
      <div>
        <AddMission para={{type: "TASK"}}/>
        <div className="" style={{marginTop: 5}}>
          <input type="checkbox" checked={this.state.selection.todo} onChange={TaskActions.selectToDo}/>
          <span style={{marginRight: 5}}><small> To Do</small></span>
          <input type="checkbox" checked={this.state.selection.done} onChange={TaskActions.selectDone}/>
          <span><small> Done</small></span>
        </div>
        <div style={{marginTop: 2}}>
          <MissionList para={{type: "TASK", isDone:{$in:[false]}}}/>
        </div>
      </div>
    );
  }
}

export default Tasks;