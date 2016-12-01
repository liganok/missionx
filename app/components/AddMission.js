import React from 'react';
import AddMissionStore from '../stores/AddMissionStore';
import AddMissionActions from '../actions/AddMissionActions';
import MissionList from './MissionList';

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
        <div className='panel-heading'>Add Mission</div>
        <div className='panel-body'>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className='form-group'>
              <input type='text' className='form-control' ref='nameTextField' value={this.state.name}
                     onChange={AddMissionActions.updateName} autoFocus/>
            </div>

            <button type='submit' className='btn btn-default'>Submit</button>
          </form>
        </div>
        <MissionList />
      </div>
    );
  }
}


export default AddMission;


