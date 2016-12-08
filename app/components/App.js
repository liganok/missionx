import React from 'react';
import Navbar from './Navbar';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="mail-box">
          <aside className="sm-side"><Navbar/></aside>
          <aside className="lg-side">{this.props.children}</aside>
        </div>
      </div>
    );
  }
}

export default App;