import React from 'react';
import AddMission from './AddMission';
import {Link} from 'react-router';
import PlansStore from '../stores/PlansStore';
import PlansActions from '../actions/PlansActions';

class Plans extends React.Component {
  constructor(props) {
    super(props);
    this.state = PlansStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    PlansStore.listen(this.onChange);
    PlansActions.getPlans(this.state.selectionPara);
  }

  componentWillUnmount() {
    PlansStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let plans = this.state.plans.map((mission, index) => {
      return (
        <li id={mission._id} className='list-group-item animated fadeIn'>
          <input type="checkbox" checked={mission.isDone} onChange={PlansActions.changeStatus}/>
          <a href ={'detail/' + mission._id}><span className="H5" style={{marginLeft: 4}}>{mission.name}</span></a>
          {mission.childNum > 0 ? <span className="badge">{mission.childNumDone}/{mission.childNum}</span>:''}
        </li>
      );
    });

    return (
      <div>
        <AddMission para={{type: "PLAN"}}/>
        <div className="" style={{marginTop: 5}}>
          <input type="checkbox" checked={this.state.selection.todo} onChange={PlansActions.selectToDo}/>
          <span style={{marginRight: 5}}><small> To Do</small></span>
          <input type="checkbox" checked={this.state.selection.done} onChange={PlansActions.selectDone}/>
          <span><small> Done</small></span>
          <ul className="list-group">
            {plans}
          </ul>
        </div>
      </div>
    );
  }
}

export default Plans;


