import React from 'react';
import Navbar from './Navbar';

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="sm-side"><Navbar/></div>
        <div className="lg-side">{this.props.children}</div>
      </div>
    );
  }
}

export default App;