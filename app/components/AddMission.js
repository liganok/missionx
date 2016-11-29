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
    AddCharacterStore.listen(this.onChange);
  }

  componentWillUnmount() {
    AddCharacterStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event){
    event.preventDefault();

    var name = this.state.name.trim();
    if (name){
      AddMissionActions.addMission(name);
    }
  }



  render() {
    let missionList = AddMissionActions.getMissions().map((mission, index) => {
      return (
        <div key={mission.missionId} className='list-group-item animated fadeIn'>
          <div className="media-body">
            <h4 className="media-heading">
              {mission.name}
            </h4>
          </div>
        </div>
      );
    });


    return (
      <div className="container">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <label className='control-label'>Mission for me</label>
            <input type="text" className="form-control" ref="nameTextField" value={this.state.name}
                   onChange={AddMissionActions.updateName} autoFocus/>
          </div>

          <button type="submit" className="btn btn-default">Submit</button>
        </form>
        <div className="list-group">
          {missionList}
        </div>
      </div>
    );
  }
}


export default AddMission;


