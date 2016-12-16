import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import AddMission from './components/AddMission';
import ToDoMissionList from './components/ToDoMissionList';
import DoneMissionList from './components/DoneMissionList';
import Navbar from './components/Navbar';
import Tasks from './components/Tasks';
import Plans from './components/Plans';
import MissionDetail from './components/MissionDetail';


export default (
  <Route component={App}>
    <Route path='/' component={Tasks}/>
    <Route path='/todolist' component={ToDoMissionList}/>
    <Route path='/donelist' component={DoneMissionList}/>
    <Route path='/navbar' component={Navbar}/>
    <Route path='/tasks' component={Tasks}/>
    <Route path='/plans' component={Plans}/>
    <Route path='/plan/:id' component={MissionDetail}/>
  </Route>
);