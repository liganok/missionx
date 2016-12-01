import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import AddMission from './components/AddMission';
import MissionList from './components/MissionList';

export default (
  <Route component={App}>
    <Route path='/' component={AddMission} />
    <Route path='/list' component={MissionList} />
  </Route>
);