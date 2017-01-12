import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import AddMission from './components/AddMission';
import Navbar from './components/Navbar';
import Tasks from './components/Tasks';
import Plans from './components/Plans';
import MissionDetail from './components/MissionDetail';


export default (
  <Route component={App}>
    <Route path='/' component={Tasks}/>
    <Route path='/navbar' component={Navbar}/>
    <Route path='/tasks' component={Tasks}/>
    <Route path='/plans' component={Plans}/>
    <Route path='/detail/:id' component={MissionDetail}/>
  </Route>
);