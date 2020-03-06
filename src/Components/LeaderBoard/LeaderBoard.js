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
        axios.get('/api/leaderboard/byscore').then( res => {
            this.setState({leaderboard:res.data})}
            )}

    sortByScore = () => {
        console.log('hit')
        axios.get('/api/leaderboard/byscore').then( res => {
            this.setState({leaderboard:res.data})}
            )}

    sortByFloors = () => {
        console.log('hit')
        axios.get('/api/leaderboard/byfloor').then( res => {
            this.setState({leaderboard:res.data})}
            )}
        
    

    render(){
        return(
            <div>
                <h1>LeaderBoard</h1>
                <button onClick={() => this.props.history.push('/header')}>MAIN MENU</button>
                <button onClick={() => this.props.history.push('/profile')}>PROFILE</button>
                <button onClick={() => this.sortByScore}>By Score</button>
                <button onClick={() => this.sortByFloors}>By Floor</button>
                {this.state.leaderboard.map(score => {
                    return(
                    <div>
                        <h2>{score.username}</h2>
                        <p>Points:{score.points}</p>
                        <p>Floors:{score.floors}</p>
                        <p>Death:{score.death}</p>
                        </div>
                    )
                })}
            </div>
        )
    }

}

export default withRouter(LeaderBoard)