import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth from './Components/Auth/Auth';
import Header from './Components/Header/Header';
import Dashboard from './Components/Dashboard/Dashboard';
import LeaderBoard from './Components/LeaderBoard/LeaderBoard';
import Profile from './Components/Profile/Profile';
import MonsterCreator from './Components/MonsterCreation/MonsterCreation';

export default (
    <Switch>
        <Route exact path ='/' component={Auth}/>
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/header' component={Header}/>
        <Route path ='/leaderboard' component={LeaderBoard}/>
        <Route path ='/profile' component={Profile}/>
        <Route path ='/monstercreator' component={MonsterCreator}/>
    </Switch>
)