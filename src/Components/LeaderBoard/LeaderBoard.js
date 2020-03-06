import React from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'


class LeaderBoard extends React.Component{
    constructor(){
        super()
        this.state = {
            leaderboard:[{username:'Test',score:100,floors:20,death:'Test death text'},{username:'Test 2',score:200,floors:40,death:'Test death text'}],


        }
    }
    componentDidMount(){
        axios.get('/api/leaderboard').then( res => {
            this.setState({leaderboard:res.data})}
            )}

    render(){
        return(
            <div>
                <h1>LeaderBoard</h1>
                {this.state.leaderboard.map(score => {
                    return(
                    <div>
                        <p>{score.username}</p>
                        <p>{score.points}</p>
                        <p>{score.floors}</p>
                        <p>{score.death}</p>
                        </div>
                    )
                })}
                <button onClick={() => this.props.history.push('/dashboard')}>Start Run</button>
            </div>
        )
    }

}

export default withRouter(LeaderBoard)