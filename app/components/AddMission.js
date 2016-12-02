import React from 'react';
import AddMissionStore from '../stores/AddMissionStore';
import AddMissionActions from '../actions/AddMissionActions';
import ToDoMissionList from './ToDoMissionList';
import DoneMissionList from './DoneMissionList';

class AddMission extends React.Component {
  constructor(props) {
    super(props);
    this.state = AddMissionStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    AddMissionStore.listen(this.onChange);
  }

  componentWillUnmount() {
    AddMissionStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    var name = this.state.name.trim();
    if (name) {
      AddMissionActions.addMission(name);
    }
  }

  render() {
    return (
      <div className='container'>
        <div>
          <div className='panel-heading'>Add Mission</div>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className='form-group'>
              <input type='text' className='form-control' ref='nameTextField' value={this.state.name}
                     onChange={AddMissionActions.updateName} autoFocus/>
            </div>
            <button type='submit' className='btn btn-default'>Submit</button>
          </form>
        </div>
        <div>
          <div className='panel-heading'>To Do</div>
          <ToDoMissionList type='TODO'/>
        </div>
        <div>
          <div className='panel-heading'>Done</div>
          <DoneMissionList type='Done'/>
        </div>
      </div>
    );
  }
}


export default AddMission;


