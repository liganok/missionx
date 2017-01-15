import React from 'react';
import Navbar from './Navbar';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar/>
        <div>
          <div className="container col-md-10 col-md-offset-1">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default App;