import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Header from './Components/Header/Header';
import Auth from './Components/Auth/Auth';

export default (
    <Switch>
        <Route exact path ='/' component={Auth}/>
        <Route path='/dashboard'/>
        <Route/>
    </Switch>
)