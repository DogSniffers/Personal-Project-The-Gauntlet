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
            <div>
                <h1>Profile</h1>
                <button onClick={() => this.props.history.push('/header')}>MAIN MENU</button>
                <button onClick ={() => this.props.history.push('/leaderboard')}>LEADERBOARD</button>
                <div>
                    <button onClick={() => this.props.history.push('/monstercreator')}>MONSTER CREATOR</button>
                </div>
            </div>
            <div>
                <h2>Username Goes Here</h2>
                <h2>Created Monsters:</h2>
                <h2>Recent Runs:</h2>
            </div>
            </div>
        )

    }
}

export default withRouter(Profile)