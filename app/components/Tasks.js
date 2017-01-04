import React from 'react';
import {Link} from 'react-router';
import TasksActions from '../actions/TasksActions';
import TasksStore from '../stores/TasksStore';
import AddMission from './AddMission';


class Tasks extends React.Component {
  constructor(props) {
    super(props);
    this.state = TasksStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    TasksStore.listen(this.onChange);
    TasksActions.getTasks(this.state.selectionPara)
  }

  componentWillUnmount() {
    TasksStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let tasks = this.state.tasks.map((mission, index) => {
      return (
        <li id={mission._id} className='list-group-item animated fadeIn'>
          <input type="checkbox" checked={mission.isDone} onChange={PlansActions.changeStatus}/>
          <Link to={'detail/' + mission._id}><span className="H5" style={{marginLeft: 4}}>{mission.name}</span></Link>
          <span className="badge">5/14</span>
        </li>
      );
    });

    return (
      <div>
        <AddMission para={{type: "TASK"}}/>
        <div className="" style={{marginTop: 5}}>
          <input type="checkbox" checked={this.state.selection.todo} onChange={TasksActions.selectToDo}/>
          <span style={{marginRight: 5}}><small> To Do</small></span>
          <input type="checkbox" checked={this.state.selection.done} onChange={TasksActions.selectDone}/>
          <span><small> Done</small></span>
          <ul className="list-group">
            {tasks}
          </ul>
        </div>
      </div>
    );
  }
}

export default Tasks;