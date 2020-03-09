import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'

class Profile extends React.Component{
    constructor(){
        super()
        this.state = {
            monsterList:[],
            runList:[]
        }
    }

    componentDidMount(){
        var {username} = this.props.reduxState
        axios.post('/api/mymonsters', {username:username}).then(res =>{
            this.setState({monsterList:res.data})
        })
        axios.post('/api/myleaderboard', {username:username}).then(res =>{
            this.setState({runList:res.data})
        })

    }
    

    render(){
        console.log(this.state)
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
                <div>
                    <h2>Created Monsters:</h2>
                    {this.state.monsterList.map(monster =>{
                        return(
                            <div>{monster.name}</div>
                        )
                    })}
                </div>
                <div>
                <h2>Recent Runs:</h2>
                {this.state.runList.map(run => {
                    return(
                    <div>
                        <p>Floors:{run.floors}</p>
                        <p>Score:{run.score}</p>
                        <p>Death Message:{run.deathMessage}</p>
                    </div>
                    )
                })}
                </div>
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