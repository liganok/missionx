import React from 'react';
import {Link} from 'react-router';



const propTypes = {
  id:React.PropTypes.string,
  checked:React.PropTypes.bool
};

const defaultProps = {
  checked: false
};

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked:this.props.checked
    };
  }

  componentDidMount() {
    //this.handleSelect();
  }

  handleStatusChange(e){
    this.setState({checked:e.target.checked});
    $.ajax({
      type: 'PUT',
      url: '/api/missions',
      data: {isDone:e.target.checked, missionId:this.props.id}
    }).done((data)=>{
      if(this.props.onStatusChanged){
        this.props.onStatusChanged();
      }
    }).fail((jqxhr)=>{
    });

  }


  render() {

    return (
      <li id={this.props.id} className='list-group-item animated fadeIn'>
        <input type="checkbox" checked={this.state.checked} onChange={this.handleStatusChange.bind(this)}/>
        <a href={'../detail/' + this.props.id}><span className="H5" style={{marginLeft: 4}}>{this.props.name}</span></a>
      </li>
    );
  }
}

ListItem.propTypes = propTypes;
ListItem.defaultProps = defaultProps;

export default ListItem;


