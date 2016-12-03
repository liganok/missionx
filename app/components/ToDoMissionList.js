import React from 'react';
import ToDoMissionListStore from '../stores/ToDoMissionListStore';
import ToDoMissionListActions from '../actions/ToDoMissionListActions';

class ToDoMissionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = ToDoMissionListStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ToDoMissionListStore.listen(this.onChange);
    ToDoMissionListActions.getMissions(this.props.type);
  }

  componentWillUnmount() {
    ToDoMissionListStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }


  render() {
    let missionList = this.state.missions.map((mission, index) => {
      return (
        <div id={mission._id} className='list-group-item animated fadeIn'>
          <h4 className='media-heading'>
            <input type='checkbox' checked={mission.isDone}
                   onChange={ToDoMissionListActions.changeStatus}>    {mission.name}</input>
          </h4>
        </div>
      );
    });

    return (
      <div className='container'>
        <div className="row flipInX animated">
          <div className="col-md-12">
            <div className="panel panel-default">
              <div className='panel-heading'>To Do</div>
              <div className='list-group'>
                {missionList}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ToDoMissionList;


