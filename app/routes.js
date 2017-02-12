import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Inbox from './components/Inbox';
import Trash from './components/Trash';
import Tasks from './components/Tasks';
import Plans from './components/Plans';
import MissionDetail from './components/MissionDetail';


export default (
  <Route component={App}>
    <Route path='/' component={Tasks}/>
    <Route path='/inbox' component={Inbox}/>
    <Route path='/home' component={Home}/>
    <Route path='/tasks' component={Tasks}/>
    <Route path='/plans' component={Plans}/>
    <Route path='/trash' component={Trash}/>
    <Route path='/detail/:id' component={MissionDetail}/>
  </Route>
);