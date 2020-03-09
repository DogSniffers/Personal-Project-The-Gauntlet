import React from 'react';
import {withRouter} from 'react-router-dom';
import './App.css';
import route from './routes';

function App(props) {
  return (
    <div className="App">
      {props.location.pathname === '/' ? (
        <>
        {route}
        {/* AUTHORIZATION PAGE */}
        </>
      ):(
      <>
      <div>
        {route}
      </div>
      </>)}
    </div>
  );
}

export default  withRouter(App);
