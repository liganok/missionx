import React from 'react';
import AddMissionStore from '../stores/AddMissionStore';
import AddMissionActions from '../Actions/AddMissionActions';

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

	


  render() {
    return (
	    <div className="container">
			<div className="row clearfix">
				<div className="col-md-12 column">
					<form role="form">
						<div className="form-group">
							 <label className='control-label'>Mission for me</label>
							 <input type="text" className="form-control" name="missionName" id="missionNameID" />
						</div>

						<button type="submit" className="btn btn-default">Submit</button>
					</form>
				</div>
			</div>
		</div>
    );
  }
}

export default AddMission;