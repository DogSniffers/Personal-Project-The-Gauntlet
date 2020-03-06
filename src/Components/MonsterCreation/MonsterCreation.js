import React from 'react'
import {withRouter} from 'react-router-dom'

class MonsterCreator extends React.Component{
    constructor(){
        super()
        this.state = {
            monsterName:'',
            monsterClass:'',
            monsterHealth:10,
            monsterAttack1Name:'',
            monsterAttack1Damage:3,
            monsterAttack1Type:'Slash',
            type1List:false,
            monsterAttack2Name:'',
            monsterAttack2Damage:3,
            monsterAttack2Type:'Slash',
            type2List:false,
            xpReward:3,
            scoreReward:20
        }
    }
    handleMonsterNameInput = event => {
        this.setState({monsterName:event.target.value})
    }
    handleMonsterClassInput = event => {
        this.setState({monsterClass:event.target.value})
    }
    handleMonsterAttack1NameInput = event => {
        this.setState({monsterAttack1Name:event.target.value})
    }
    handleMonsterAttack2NameInput = event => {
        this.setState({monsterAttack2Name:event.target.value})
    }
    

    createMonster = () => {
        let field = this.state
        if(field.monsterName === ''){
            alert('Monster name is Empty!')
        }else if(field.monsterClass === ''){
            alert('Monster Class is Empty!')
        }else if(field.monsterAttack1Name === ''){
            alert('Monster Attack Name 1 is Empty!')
        }else if(field.monsterAttack2Name === ''){
            alert('Monster Attack Name 2 is Empty!')
        }else{
            console.log('hit')
        }
    }

    render(){
        console.log(this.state.type1List)
        return(
            <>
            <div>
                <h1>Monster Creator</h1>
                <button onClick={() => this.props.history.push('/profile')}>PROFILE</button>
                <button onClick={() => this.props.history.push('/header')}>MAIN MENU</button>
            </div>
            <div>
            <button onClick={this.createMonster}>Confirm</button>
                <div>
                    <p>Monster Name:</p>
                    <input onChange={this.handleMonsterNameInput}></input>
                    <p>{this.state.monsterName}</p>
                </div>
                <div>
                    <p>Monster Class:</p>
                    <input onChange={this.handleMonsterClassInput}></input>
                    <p>{this.state.monsterClass}</p>
                </div>
                <div>
                    <p>Monster Health:</p>
                    <button onClick={() =>this.setState({monsterHealth:10})}>10</button>
                    <button onClick={() =>this.setState({monsterHealth:12})}>12</button>
                    <button onClick={() =>this.setState({monsterHealth:15})}>15</button>
                    <button onClick={() =>this.setState({monsterHealth:20})}>20</button>
                    <button onClick={() =>this.setState({monsterHealth:25})}>25</button>
                    <p>{this.state.monsterHealth}</p>
                    <input></input>
                </div>
                <div>
                    <p>Monster Weaknesses:</p>
                    <input></input>
                </div>
                <div>
                    <p>Monster Resistances:</p>
                    <input></input>
                </div>
                <div>
                    <p>Monster Attack 1 Name:</p>
                    <input onChange={this.handleMonsterAttack1NameInput}></input>
                    <p>{this.state.monsterAttack1Name}</p>
                </div>
                <div>
                    <p>Monster Attack 1 Type:</p>
                     <p>{this.state.monsterAttack1Type}</p>
                    <button onClick={() =>this.setState({type1List:!this.state.type1List})}>Type List</button>
                    {this.state.type1List === true ? (
                        <div>
                            <button onClick={() =>this.setState({monsterAttack1Type:'Blunt'})}>Blunt</button>
                            
                        </div>

                    ):(
                        null
                    )}
                    
                </div>
                <div>
                    <p>Monster Attack 1 Damage:</p>
                    <button onClick={() =>this.setState({monsterAttack1Damage:3})}>3</button>
                    <button onClick={() =>this.setState({monsterAttack1Damage:5})}>5</button>
                    <button onClick={() =>this.setState({monsterAttack1Damage:8})}>8</button>
                    <button onClick={() =>this.setState({monsterAttack1Damage:10})}>10</button>
                    <p>{this.state.monsterAttack1Damage}</p>
                </div>
                <div>
                    <p>Monster Attack 2 Name:</p>
                    <input onChange={this.handleMonsterAttack2NameInput}></input>
                    <p>{this.state.monsterAttack2Name}</p>
                </div>
                <div>
                    <p>Monster Attack 2 Type:</p>
                    <input></input>
                </div>
                <div>
                    <p>Monster Attack 2 Damage:</p>
                    <button onClick={() =>this.setState({monsterAttack2Damage:3})}>3</button>
                    <button onClick={() =>this.setState({monsterAttack2Damage:5})}>5</button>
                    <button onClick={() =>this.setState({monsterAttack2Damage:8})}>8</button>
                    <button onClick={() =>this.setState({monsterAttack2Damage:10})}>10</button>
                    <p>{this.state.monsterAttack2Damage}</p>
                </div>
                <div>
                    <p>Monster XP Reward:</p>
                    <button onClick={() =>this.setState({xpReward:3})}>3</button>
                    <button onClick={() =>this.setState({xpReward:5})}>5</button>
                    <button onClick={() =>this.setState({xpReward:8})}>8</button>
                    <button onClick={() =>this.setState({xpReward:12})}>12</button>
                    <button onClick={() =>this.setState({xpReward:15})}>15</button>
                    <p>{this.state.xpReward}</p>
                </div>
                <div>
                    <p>Monster Score Reward:</p>
                    <button onClick={() =>this.setState({scoreReward:20})}>20</button>
                    <button onClick={() =>this.setState({scoreReward:40})}>40</button>
                    <button onClick={() =>this.setState({scoreReward:60})}>60</button>
                    <button onClick={() =>this.setState({scoreReward:80})}>80</button>
                    <button onClick={() =>this.setState({scoreReward:100})}>100</button>
                    <p>{this.state.scoreReward}</p> 
                </div>
            </div>
            </>
        )
    }
}

export default withRouter(MonsterCreator)