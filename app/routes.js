import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import AddMission from './components/AddMission';
import ToDoMissionList from './components/ToDoMissionList';
import DoneMissionList from './components/DoneMissionList';

export default (
  <Route component={App}>
    <Route path='/' component={AddMission} />
    <Route path='/todolist' component={ToDoMissionList} />
    <Route path='/donelist' component={DoneMissionList} />
  </Route>
);