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
            <div>
            <h1>The Gauntlet</h1>
            <button onClick={ () =>this.props.history.push('/dashboard')}>START</button>
            <button onClick={() => this.props.history.push('/leaderboard')}>LEADERBOARD</button>
            </div>
        )
    }
}

export default withRouter(Header);