import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import AddMission from './components/AddMission';
import ToDoMissionList from './components/ToDoMissionList';
import DoneMissionList from './components/DoneMissionList';
import Navbar from './components/Navbar';
import Tasks from './components/Tasks';

export default (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='/todolist' component={ToDoMissionList} />
    <Route path='/donelist' component={DoneMissionList} />
    <Route path='/navbar' component={Navbar} />
    <Route path='/tasks' component={Tasks} />
    <Route path='/plans' component={Tasks} />
  </Route>
);