import React from 'react';
import {Link} from 'react-router';
import MissionListStore from '../stores/MissionListStore';
import MissionListActions from '../actions/MissionListActions';

class MissionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = MissionListStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    //alert(JSON.stringify(this.state));
    //MissionListStore.initMissionStore2();
    MissionListStore.listen(this.onChange);
    MissionListActions.getList(this.state.selection);
  }

  componentWillUnmount() {
    MissionListStore.unlisten(this.onChange);
  }

  componentWillReceiveProps(nextProps) {

  }

  onChange(state) {
    this.setState(state);
  }


  render() {
    let list = this.state.list.map((item, index) => {
      return (
        <li id={item._id} className='list-group-item animated fadeIn'>
          <input type="checkbox" checked={item.isDone} onChange={MissionListActions.changeStatus}/>
          <Link to={'detail/' + item._id}><span className="H5" style={{marginLeft: 4}}>{item.name}</span></Link>
        </li>
      );
    });

    return (
      <div>
        <div>
          <input type="checkbox" value={this.props} checked={this.state.selection.todo} onChange={MissionListActions.isDoneChange}/>
          <span style={{marginRight: 5}}><small> To Do</small></span>
          <input type="checkbox" checked={this.state.selection.done} onChange={MissionListActions.selectDone}/>
          <span><small> Done</small></span>
          <ul className="list-group">
            {list}
          </ul>
        </div>
      </div>

    );
  }
}

export default MissionList;


