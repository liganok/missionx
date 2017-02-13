import React from 'react';


const propTypes = {
  parentId:React.PropTypes.string,
  type:React.PropTypes.string,
  description:React.PropTypes.string
};

const defaultProps = {
  type: 'TASK'
};

class AddMission extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name:''
    };
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  onChange(state) {
    this.setState(state);
  }

  handleUpdateName(e){
    this.setState({name:e.target.value});
  }

  handleSubmit(e) {

    if (!this.state.name.trim()) return;

    let para = {
      name: this.state.name.trim(),
      type: this.props.type,
      parentId: this.props.parentId
    };
    $.ajax({
      type: 'POST',
      url: '/api/mission',
      data: para
    }).done((data)=>{
      this.setState({name:''});
      if(this.props.onSaved){
        this.props.onSaved();
      }
    }).fail((jqxhr)=>{
    });
  }

  render() {
    return (
      <div>
        <div className="input-group">
          <input type="text" className="form-control" ref='nameTextField' value={this.state.name}
                 onChange={this.handleUpdateName.bind(this)} autoFocus/>
          <span className="input-group-btn">
            <button className="btn btn-default" type="button" onClick={this.handleSubmit.bind(this)}>Add</button>
          </span>
        </div>
      </div>
    );
  }
}

AddMission.propTypes = propTypes;
AddMission.defaultProps = defaultProps;

export default AddMission;


