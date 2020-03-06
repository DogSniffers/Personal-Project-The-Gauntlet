import React from 'react'
import {withRouter} from 'react-router-dom'

class Profile extends React.Component{
    constructor(){
        super()
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <h1>Profile</h1>
                <button onClick={() => this.props.history.push('/header')}>MAIN MENU</button>
                <button onClick ={() => this.props.history.push('/leaderboard')}>LEADERBOARD</button>
                <button onClick={() => this.props.history.push('/monstercreator')}>MONSTER CREATOR</button>
            </div>
        )

    }
}

export default withRouter(Profile)