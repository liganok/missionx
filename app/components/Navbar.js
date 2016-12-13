import React from 'react';
import {Link} from 'react-router';
//import NavbarStore from '../stores/NavbarStore';
//import NavbarActions from '../actions/NavbarActions';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    //this.state = NavbarStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  onChange(state) {
    this.setState(state);
  }


  render() {
    return (
      <div>
        {/* <div className="user-head">
          <a className="inbox-avatar" href="javascript:;">
          </a>
          <div className="user-name">
          </div>
          <a className="mail-dropdown pull-right" href="javascript:;">
            <i className="fa fa-chevron-down"></i>
          </a>
        </div>*/}
        <ul className="inbox-nav inbox-divider">
          <li>
            <a href="/tasks"><i className="fa fa-inbox"></i> Tasks <span
              className="label label-danger pull-right">2</span></a>

          </li>
          <li>
            <a href="/plans"><i className="fa fa-envelope-o"></i> Plans</a>
          </li>
          <li>
            <a href="#"><i className=" fa fa-trash-o"></i> Trash</a>
          </li>
        </ul>
        <ul className="nav nav-pills nav-stacked labels-info inbox-divider">
          <li><h4>Labels</h4></li>
          <li><a href="#"> <i className=" fa fa-sign-blank text-danger"></i> Work </a></li>
          <li><a href="#"> <i className=" fa fa-sign-blank text-success"></i> Design </a></li>
          <li><a href="#"> <i className=" fa fa-sign-blank text-info "></i> Family </a>
          </li>
          <li><a href="#"> <i className=" fa fa-sign-blank text-warning "></i> Friends </a>
          </li>
          <li><a href="#"> <i className=" fa fa-sign-blank text-primary "></i> Office </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navbar;