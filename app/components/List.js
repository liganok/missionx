import classNames from 'classnames';
import React from 'react';
import {Link} from 'react-router';
import ListItem from './ListItem';


function convertToDoCondition(para) {
  let isDone;
  let todoIsChecked = para.todoIsChecked;
  let doneIsChecked = para.doneIsChecked;
  if(todoIsChecked && doneIsChecked) isDone = {$in:[true,false]};
  if(todoIsChecked && !doneIsChecked) isDone = {$in:[false,false]};
  if(!todoIsChecked && doneIsChecked) isDone = {$in:[true,true]};
  if(!todoIsChecked && !doneIsChecked) isDone = {$nin:[true,false]};
  return isDone;
}

const propTypes = {
  parentId:React.PropTypes.string,
  type:React.PropTypes.string,
  status:React.PropTypes.string,
  todoIsChecked:React.PropTypes.bool,
  doneIsChecked:React.PropTypes.bool,
  updateFlag:React.PropTypes.bool
};

const defaultProps = {
  type:'TASK',
  status:'A',
  todoIsChecked: true,
  doneIsChecked: false,
  updateFlag:false
};

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list:[]
    };
    this.uiControl = {
      todoIsChecked:props.todoIsChecked,
      doneIsChecked:props.doneIsChecked
    };
    this.onChange = this.onChange.bind(this);
    this.handleSelectToDo = this.handleSelectToDo.bind(this);
    this.handleSelectDone = this.handleSelectDone.bind(this);


  }

  componentDidMount() {
    //this.handleSelect();
    this.getList();
  }

  componentWillUnmount() {
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.updateFlag){
      this.getList();
    }
  }

  onChange(state) {
    this.setState(state);
  }

  getList(){
    let isDone = convertToDoCondition({
      todoIsChecked:this.uiControl.todoIsChecked,
      doneIsChecked:this.uiControl.doneIsChecked
    });

    let condition = {
      parentId:this.props.parentId,
      type:this.props.type,
      status:this.props.type? 'A':null,
      isDone:isDone
    };
    $.ajax({
      type: 'GET',
      url: '/api/missionList',
      data:{'condition':condition}
    }).done((data)=> {
      this.setState({list:data});
    }).fail((jqxhr)=> {
    });
  }

  handleSelectToDo(event){
    this.uiControl.todoIsChecked = event.target.checked;
    this.getList();
  }

  handleSelectDone(event){
    this.uiControl.doneIsChecked = event.target.checked;
    this.getList();
  }

  handleStatusChanged(){
    this.getList();
  }

  render() {
    let list = this.state.list.map((item, index) => {
      return (
        <ListItem key={item._id} id={item._id} checked={item.isDone} name={item.name} onStatusChanged={this.handleStatusChanged.bind(this)}/>
      );
    });

    return (
      <div>
        <div>
          <input type="checkbox" checked={this.uiControl.todoIsChecked} onChange={this.handleSelectToDo} />
          <span style={{marginRight: 5}}><small> To Do</small></span>
          <input type="checkbox" checked={this.uiControl.doneIsChecked} onChange={this.handleSelectDone} />
          <span><small> Done</small></span>
          <ul className="list-group">
            {list}
          </ul>
        </div>
      </div>
    );
  }
}

List.propTypes = propTypes;
List.defaultProps = defaultProps;

export default List;


