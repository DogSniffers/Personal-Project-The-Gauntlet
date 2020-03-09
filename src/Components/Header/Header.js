import React from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

class Header extends React.Component{
    constructor(){
        super()
        this.state = {

        }
    }
   logout = () => {
    axios.post('/api/logout').then(res =>{
        console.log('hit')
    })

   }
    render(){
        return(
            <div className='header'>
            <h1 className='theGauntlet'>The Gauntlet</h1>
            <div className='menuButtons'>
                <button onClick={ () =>this.props.history.push('/dashboard')}>START</button>
                <button onClick={() => this.props.history.push('/leaderboard')}>LEADERBOARD</button>
                <button onClick={() => this.props.history.push('/profile')}>PROFILE</button>
                <button onClick={this.logout, () => this.props.history.push('/')}>LOGOUT</button>
            </div>
            </div>
        )
    }
}

export default withRouter(Header);