import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import AddMission from './components/AddMission';

export default (
  <Route component={App}>
    <Route path='/' component={AddMission} />
    <Route path='/add' component={AddMission} />
  </Route>
);