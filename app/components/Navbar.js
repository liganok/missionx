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
        <div className="user-head">
          <a className="inbox-avatar" href="javascript:;">
            <img width="64" hieght="60"
                 src="http://bootsnipp.com/img/avatars/ebeb306fd7ec11ab68cbcaa34282158bd80361a7.jpg"/>
          </a>
          <div className="user-name">
            <h5><a href="#">Alireza Zare</a></h5>
            <span><a href="#">Info.Ali.Pci@Gmail.com</a></span>
          </div>
          <a className="mail-dropdown pull-right" href="javascript:;">
            <i className="fa fa-chevron-down"></i>
          </a>
        </div>
        <div className="inbox-body">
          <a href="#myModal" data-toggle="modal" title="Compose" className="btn btn-compose">
            Compose
          </a>
        </div>
        <ul className="inbox-nav inbox-divider">
          <li className="active">
            <a href="#"><i className="fa fa-inbox"></i> Tasks <span
              className="label label-danger pull-right">2</span></a>

          </li>
          <li>
            <a href="#"><i className="fa fa-envelope-o"></i> Plans</a>
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

        <div className="inbox-body text-center">
          <div className="btn-group">
            <a className="btn mini btn-primary" href="javascript:;">
              <i className="fa fa-plus"></i>
            </a>
          </div>
          <div className="btn-group">
            <a className="btn mini btn-success" href="javascript:;">
              <i className="fa fa-phone"></i>
            </a>
          </div>
          <div className="btn-group">
            <a className="btn mini btn-info" href="javascript:;">
              <i className="fa fa-cog"></i>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;