import React from 'react';
import AddMissionStore from '../stores/AddMissionStore';
import AddMissionActions from '../actions/AddMissionActions';

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
        <div>
          <input type='text' ref='nameTextField' value={this.state.name}
                 onChange={AddMissionActions.updateName} autoFocus/>
          <button type='submit' className='btn btn-default' onClick={this.handleSubmit.bind(this)}>Submit</button>
        </div>
      </div>
    );
  }
}


export default AddMission;


