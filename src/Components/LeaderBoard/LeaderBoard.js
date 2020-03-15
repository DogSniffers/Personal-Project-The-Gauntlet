import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'
import './LeaderBoard.css'


class LeaderBoard extends React.Component{
    constructor(){
        super()
        this.state = {
            leaderboard:[],
        }
    }
    componentDidMount(){
        axios.get('/api/leaderboard/byscore').then( res => {
            this.setState({leaderboard:res.data})}
            )}

    sortByScore = () => {
        axios.get('/api/leaderboard/byscore').then( res => {
            this.setState({leaderboard:res.data})}
            )}

    sortByFloors = () => {
        axios.get('/api/leaderboard/byfloor').then( res => {
            this.setState({leaderboard:res.data})}
            )}
        
    

    render(){
        return(
            <div>
                <h1 className={`${this.props.color}pageTitle`}>LeaderBoard</h1>
                    <button onClick={() => this.props.history.push('/header')} className={`${this.props.color}button`}>MAIN MENU</button>
                    <button onClick={() => this.props.history.push('/profile')} className={`${this.props.color}button`}>PROFILE</button>
                <div>
                    <button onClick={this.sortByScore} className={`${this.props.color}button`}>By Score</button>
                    <button onClick={this.sortByFloors} className={`${this.props.color}button`}>By Floor</button>
                </div>
                {this.state.leaderboard.length === 0 ? (
                    <p>There aren't any LeaderBoard scores available!</p>
                ):( 
                    <div className={`${this.props.color}leaderboard`}>
                        {this.state.leaderboard.map(score => {
                            return(
                            <div className={`${this.props.color}leaderboardScore`}>
                                <div className={`${this.props.color}leaderboardContent`}>
                                    <h2 className={`${this.props.color}username`}>{score.username}</h2>
                                </div>
                                <div className={`${this.props.color}leaderboardContent`}>
                                    <p className={`${this.props.color}ptag`}>Points:{score.score}</p>
                                </div>
                                <div className={`${this.props.color}leaderboardContent`}>
                                    <p className={`${this.props.color}ptag`}>Floors:{score.floors}</p>
                                </div>
                                <p className={`${this.props.color}deathMessageLeaderboard`}>Death:{score.death}</p>
                            </div>
                            )
                        })}
                    </div>
                )}
            </div>
        )
    }

}
const mapStateToProps = reduxState =>{
    return{
        reduxState,
        color: reduxState.colorReducer.color
    }
}

export default connect(mapStateToProps)(withRouter(LeaderBoard))