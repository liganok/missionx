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
      <nav className="navbar navbar-default" role="navigation">
        <div className="container-fluid col-md-10 col-md-offset-1">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">
              <span>MissionX</span>
            </a>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li className=""><a href="Inbox">Inbox</a></li>
              <li className=""><a href="Tasks">Tasks</a></li>
              <li className=""><a href="Plans">Plans</a></li>
              <li className=""><a href="Trash">Trash</a></li>
            </ul>
            <form className="navbar-form navbar-left" role="search">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Search"/>
              </div>
            </form>
            <ul className="nav navbar-nav navbar-right">
              <li className=""><a href="#">liganok86</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;