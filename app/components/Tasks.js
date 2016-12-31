import React from 'react';
import ToDoMissionList from './ToDoMissionList';
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
        <AddMission para={{type:"TASK"}}/>
        <div className="col-md-10 col-md-offset-1 pull-left">
          <div className="btn-group" role="group" style={{marginTop:10}}>
            <button type="button" className="btn btn-default btn-xs"  onClick={TaskActions.getToDo}>To Do</button>
            <button type="button" className="btn btn-default btn-xs"  onClick={TaskActions.getDone}>Done</button>
          </div>
        </div>
        <div className="col-md-10 col-md-offset-1">
          <MissionList para={{type:"TASK",isDone:false}}/>
        </div>
      </div>
    );
  }
}

export default Tasks;