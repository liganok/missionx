import React from 'react';
import AddMission from './AddMission';
import MissionList from './MissionList';

class Plans extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      missions:[]
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.getMissions();
  }

  componentWillUnmount() {
  }

  onChange(state) {
    this.setState(state);
  }

  getMissions() {
    var para={type:this.props.type.trim()};
    $.ajax({
      type: 'GET',
      url: '/api/missions',
      data:para
    }).done((data)=> {
      this.setState({missions:data});
    }).fail((jqxhr)=> {
      this.actions.getMissionsFail(jqxhr.responseJSON.message);
    });
  }


  render() {
    let missionList = this.state.missions.map((mission, index) => {
      return (
        <div id={mission._id} className='list-group-item animated fadeIn'>
          <h4 className='media-heading'>
            <input type='checkbox' checked={mission.isDone}>    {mission.name}</input>
          </h4>
        </div>
      );
    });

    return (
      <div>
        <AddMission para={{type:"PLAN"}}/>
        <div className="col-md-10 col-md-offset-1" style={{marginTop:10}}>
          <MissionList  para={{type:"PLAN"}}/>
        </div>
      </div>
    );
  }
}

export default Plans;


