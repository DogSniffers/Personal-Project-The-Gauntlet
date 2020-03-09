import React from 'react'
import {withRouter} from 'react-router-dom'

class Header extends React.Component{
    constructor(){
        super()
        this.state = {

        }
    }
   
    render(){
        return(
            <div className='header'>
            <h1 className='theGauntlet'>The Gauntlet</h1>
            <div className='menuButtons'>
                <button onClick={ () =>this.props.history.push('/dashboard')}>START</button>
                <button onClick={() => this.props.history.push('/leaderboard')}>LEADERBOARD</button>
                <button onClick={() => this.props.history.push('/profile')}>PROFILE</button>
            </div>
            </div>
        )
    }
}

export default withRouter(Header);