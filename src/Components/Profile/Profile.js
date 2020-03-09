import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

class Profile extends React.Component{
    constructor(){
        super()
        this.state = {

        }
    }

    render(){
        console.log(this.props)
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
                <h2>User:{this.props.reduxState.username}</h2>
                <h2>Total Runs:{this.props.reduxState.runs}</h2>
                <h2>Created Monsters:</h2>
                <h2>Recent Runs:</h2>
            </div>
            </div>
        )

    }
}

const mapStateToProps = reduxState =>{
    return{
        reduxState
    }
}

export default connect(mapStateToProps)(withRouter(Profile))