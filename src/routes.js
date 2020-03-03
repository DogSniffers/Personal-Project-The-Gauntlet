import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Auth from './Components/Auth/Auth';
import Header from './Components/Header/Header'
import Dashboard from './Components/Dashboard/Dashboard';

export default (
    <Switch>
        <Route exact path ='/' component={Auth}/>
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/header' component={Header}/>
    </Switch>
)