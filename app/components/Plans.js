import React from 'react';

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
    $.ajax({
      type: 'GET',
      url: '/api/missions',
      data:{type:'TODO',isPlan:true}
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
      <div className='container'>
        <div className="row flipInX">
          <div className="col-md-8">
            <div className="panel panel-default">
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

export default Plans;


