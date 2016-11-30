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
    let missionList = AddMissionActions.getMissions().map((mission, index) => {
      return (
        <div key={mission.missionId} className='list-group-item animated fadeIn'>
          <div className='media-body'>
            <h4 className='media-heading'>
              {mission.name}
            </h4>
          </div>
        </div>
      );
    });

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
        <div className='list-group'>
          {missionList}
        </div>
      </div>
    );
  }
}


export default AddMission;


