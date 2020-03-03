import React from 'react';
import {withRouter} from 'react-router-dom';
import './App.css';
import route from './routes';
import Header from './Components/Header/Header';
import Auth from './Components/Auth/Auth';
import Dashboard from './Components/Dashboard/Dashboard';

function App(props) {
  console.log(props.location.pathname)
  return (
    <div className="App">
      {props.location.pathname === '/' ? (
        <>
        {route}
        {/* HEADER */}
        </>
      ):(
      <>
      <div>
        <Dashboard/>
        {route}
      </div>
      </>)}
    </div>
  );
}

export default  withRouter(App);
