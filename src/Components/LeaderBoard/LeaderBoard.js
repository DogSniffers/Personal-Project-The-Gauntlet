import React from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'


class LeaderBoard extends React.Component{
    constructor(){
        super()
        this.state = {
            leaderboard:[],


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
                <button onClick={() => this.props.history.push('/dashboard')}>Start Run</button>
            </div>
        )
    }

}

export default withRouter(LeaderBoard)