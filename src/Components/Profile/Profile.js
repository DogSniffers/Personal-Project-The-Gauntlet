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
        var {username} = this.props.reduxState.reducer
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
        console.log(this.props)
        return(
            <div>
            <div>
                <h1 className={`${this.props.color}pageTitle`}>Profile</h1>
                <button onClick={() => this.props.history.push('/header')}className={`${this.props.color}button`}>MAIN MENU</button>
                <button onClick ={() => this.props.history.push('/leaderboard')}className={`${this.props.color}button`}>LEADERBOARD</button>
                <div>
                    <button onClick={() => this.props.history.push('/monstercreator')}className={`${this.props.color}button`}>MONSTER CREATOR</button>
                </div>
            </div>
            <div>
                <h2 className={`${this.props.color}title`}>User:{this.props.reduxState.reducer.username}</h2>
                <div className={`profileHolders`}>

                <div className={`${this.props.color}createdMonsters`}>
                    <h2 className={`${this.props.color}title`}>Created Monsters:</h2>
                    {this.state.monsterList.length === 0 ? (
                        <p className={`${this.props.color}monsterinfo`}>You have no created monsters!</p>
                        ):(
                            <div>
                            {this.state.monsterList.map(monster =>{
                                return(
                                    <div className={`${this.props.color}monsterListProfile`}>
                                        <h2 className={`${this.props.color}monsterinfo`}>{monster.name}</h2>
                                        <p className={`${this.props.color}monsterinfo`}>Class:{monster.class}</p>
                                        <p className={`${this.props.color}monsterinfo`}>Health:{monster.health}</p>
                                        <p className={`${this.props.color}monsterinfo`}>Weaknesses:{monster.weaknesses}</p>
                                        <p> className={`${this.props.color}monsterinfo`}Resistances:{monster.resistances}</p>
                                        <h3 className={`${this.props.color}monsterinfo`}>Monster Attack 1: {monster.attack1name}</h3>
                                        <p className={`${this.props.color}monsterinfo`}>Type:{monster.attack1type}</p>
                                        <p className={`${this.props.color}monsterinfo`}>Damage:{monster.attack1damage}</p>
                                        <h3 className={`${this.props.color}monsterinfo`}>Monster Attack 2: {monster.attack2name}</h3>
                                        <p className={`${this.props.color}monsterinfo`}>Type:{monster.attack2type}</p>
                                        <p className={`${this.props.color}monsterinfo`}>Damage:{monster.attack2damage}</p>
                                        <p className={`${this.props.color}monsterinfo`}>XP:{monster.xpreward}</p>
                                        <p className={`${this.props.color}monsterinfo`}>Score:{monster.scorereward}</p>
                                        <button onClick={() => this.deleteMonster(monster.id)} className={`${this.props.color}deleteButtonMonster`}>Delete</button>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
                <div className={`${this.props.color}recentRuns`}>
                <h2 className={`${this.props.color}title`}>Recent Runs:</h2>
                <button onClick={this.displayChart} className={`${this.props.color}displayChartButton`}>Display Chart</button>
                {this.state.displayChart === true? (
                    // <Chart score={this.state.score}/>
                    <div className={`${this.props.color}chart`}>
                        <Chart chartData={this.state.chartData} className={`${this.props.color}chart`}/>
                    </div>
                ):(
                    null
                    )}
                {this.state.runList.length === 0 ? (
                    <p className={`${this.props.color}monsterinfo`}>You don't have any scores on the Leaderboard!</p>
                    ):(
                        <div>
                        {this.state.runList.map(run => {
                            return(
                                <div className={`${this.props.color}runScores`}>
                                <p className={`${this.props.color}monsterinfo`}>Floors:{run.floors}</p>
                                <p className={`${this.props.color}monsterinfo`}>Score:{run.score}</p>
                                <p className={`${this.props.color}monsterinfo`}>Death Message:</p>
                                <p className={`${this.props.color}monsterinfo`}>{run.death}</p>
                            </div>
                            )
                        })}
                    </div>
                )}
                </div>
            </div>
            </div>
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

export default connect(mapStateToProps)(withRouter(Profile))