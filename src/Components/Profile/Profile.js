import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import Chart from '../Chart/Chart'
import axios from 'axios'
import './Profile.css'

class Profile extends React.Component{
    constructor(){
        super()
        this.state = {
            monsterList:[],
            runList:[],
            displayChart:false,
            score:[],
        }
    }

    componentDidMount(){
        var {username} = this.props.reduxState
        axios.post('/api/mymonsters', {username:username}).then(res =>{
            this.setState({monsterList:res.data})
        })
        axios.post('/api/myleaderboard', {username:username}).then(res =>{
            this.setState({runList:res.data})
            let score = res.data.map(e => {
                return e.score
            })
            let labels = score.map((e,i) => {
               return `Run ${i + 1}`
            })
            let colors = score.map(e => {
                return 'rgba(48.6, 98.8, 0)'
            })
            let color = 'rgba(90.0, 98.8, 0)'
            this.setState({chartData:{
                labels: [...labels],
                datasets:[
                  {
                    label:'Run Score',
                    data:[...score],
                    backgroundColor:[...colors],
                    fontColor:['rgba(90.0, 98.8, 0)']
                  }
                ]
              }})
            let floors = res.data.map(e => {
                return e.floors
            })

            console.log(score)
            console.log(floors)
        })

        

        
    }

    deleteMonster = (monsterId) => {
        axios.delete(`/api/mymonsters/${monsterId}`).then(res => {
            var {username} = this.props.reduxState
        axios.post('/api/mymonsters', {username:username}).then(res =>{
            this.setState({monsterList:res.data})
        })
        })
    }
    displayChart = () => {
        this.setState({displayChart:!this.state.displayChart})
    }
    

    render(){
        console.log(this.state)
        return(
            <div>
            <div>
                <h1 className='pageTitle'>Profile</h1>
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
                    {this.state.monsterList.length === 0 ? (
                        <p>You have no created monsters!</p>
                    ):(
                        <div>
                            {this.state.monsterList.map(monster =>{
                                return(
                                    <div>
                                        <h2>{monster.name}</h2>
                                        <p>Class:{monster.class}</p>
                                        <p>Health:{monster.health}</p>
                                        <p>Weaknesses:{monster.weaknesses}</p>
                                        <p>Resistances:{monster.resistances}</p>
                                        <h3>Monster Attack 1: {monster.attack1name}</h3>
                                        <p>Type:{monster.attack1type}</p>
                                        <p>Damage:{monster.attack1damage}</p>
                                        <h3>Monster Attack 2: {monster.attack2name}</h3>
                                        <p>Type:{monster.attack2type}</p>
                                        <p>Damage:{monster.attack2damage}</p>
                                        <p>XP:{monster.xp}</p>
                                        <p>Score:{monster.score}</p>
                                        <button onClick={() => this.deleteMonster(monster.id)}>Delete</button>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
                <div>
                <h2>Recent Runs:</h2>
                <button onClick={this.displayChart}>Display Chart</button>
                {this.state.displayChart === true? (
                    // <Chart score={this.state.score}/>
                    <div className='chart'>
                        <Chart chartData={this.state.chartData} className='chart'/>
                    </div>
                ):(
                    null
                )}
                {this.state.runList.length === 0 ? (
                    <p>You don't have any scores on the Leaderboard!</p>
                ):(
                    <div>
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
                )}
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