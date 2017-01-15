import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import MissionList from './components/MissionList';
import Navbar from './components/Navbar';
import Tasks from './components/Tasks';
import Plans from './components/Plans';
import MissionDetail from './components/MissionDetail';


export default (
  <Route component={App}>
    <Route path='/' component={Tasks}/>
    <Route path='/list' component={MissionList}/>
    <Route path='/home' component={Home}/>
    <Route path='/tasks' component={Tasks}/>
    <Route path='/plans' component={Plans}/>
    <Route path='/detail/:id' component={MissionDetail}/>
  </Route>
);