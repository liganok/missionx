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
    var para = {
      name: this.state.name.trim(),
      type: this.props.para.type,
      parentId: this.props.para.parentId
    };
    if (para.name) {
      AddMissionActions.addMission(para);
    }
  }

  render() {
    return (
      <div className="container col-md-10 col-md-offset-1">
        <div className="input-group">
          <input type="text" className="form-control" ref='nameTextField' value={this.state.name}
                 onChange={AddMissionActions.updateName} autoFocus/>
          <span className="input-group-btn">
            <button className="btn btn-default" type="button" onClick={this.handleSubmit.bind(this)}>Add</button>
          </span>
        </div>
      </div>
    );
  }
}


export default AddMission;


