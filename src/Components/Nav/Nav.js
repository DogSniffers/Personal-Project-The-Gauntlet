import React from 'react'
import Axios from 'axios'
import {withRouter} from 'react-router-dom'

class Nav extends React.Component{


    logout = () => {
        Axios.post('/api/logout').then(() => {
            this.props.history.push('/')
        })
    }

    render(){
        return(
            <div className='navbar'>
            <h1>The Gauntlet</h1>
            <button onClick={this.logout}>Logout</button>
            </div>
        )
    }
}

export default withRouter(Nav)