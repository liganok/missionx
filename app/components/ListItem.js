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
      checked:this.props.item.checked
    };
  }

  componentDidMount() {
    //this.handleSelect();
  }

  handleStatusChange(e){
    this.setState({checked:e.target.checked});
    $.ajax({
      type: 'PUT',
      url: '/api/mission',
      data: {isDone:e.target.checked, _id:this.props.item._id}
    }).done((data)=>{
      if(this.props.onStatusChanged){
        this.props.onStatusChanged();
      }
    }).fail((jqxhr)=>{
    });

  }


  render() {

    return (
      <li id={this.props.item._id} className='list-group-item animated fadeIn'>
        <input type="checkbox" checked={this.state.checked} onChange={this.handleStatusChange.bind(this)}/>
        <a href={'../detail/' + this.props.item._id}><span className="H5" style={{marginLeft: 4}}>{this.props.item.name}</span></a>
        {this.props.item.childNum > 0 ? <span className="badge">{this.props.item.childDoneNum}/{this.props.item.childNum}</span>:''}
      </li>
    );
  }
}

ListItem.propTypes = propTypes;
ListItem.defaultProps = defaultProps;

export default ListItem;


