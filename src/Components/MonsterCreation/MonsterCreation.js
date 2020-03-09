import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'

class MonsterCreator extends React.Component{
    constructor(){
        super()
        this.state = {
            monsterName:'',
            monsterClass:'',
            monsterHealth:10,
            healthList:false,

            monsterAttack1Name:'',
            monsterAttack1Damage:3,
            monsterAttack1DamageList:false,
            monsterAttack1Type:'Slash',
            type1List:false,

            monsterAttack2Name:'',
            monsterAttack2Damage:3,
            monsterAttack2DamageList:false,
            monsterAttack2Type:'Slash',
            type2List:false,

            monsterResistances:'Blunt',
            monsterWeaknesses:'Slash',
            monsterResistancesList:false,
            monsterWeaknessesList:false,

            xpReward:3,
            xpList:false,

            scoreReward:20,
            scoreList:false,
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
            var {monsterName,monsterClass,monsterHealth,monsterWeaknesses,monsterResistances,monsterAttack1Name, monsterAttack1Type, monsterAttack1Damage, monsterAttack2Name,monsterAttack2Type,monsterAttack2Damage,xpReward,scoreReward} = this.state
            var {username} = this.props.reduxState
            axios.post('/api/monstercreator', {monsterName,monsterClass,monsterHealth,monsterWeaknesses,monsterResistances,monsterAttack1Name, monsterAttack1Type, monsterAttack1Damage, monsterAttack2Name,monsterAttack2Type,monsterAttack2Damage,xpReward,scoreReward,username}).then(res => {
                alert('Monster Successfully Created!')
            }).catch(err => console.log(err))
        }
    }

    render(){
        console.log(this.props)
        return(
            <>
            <div>
                <h1>Monster Creator</h1>
                <button onClick={() => this.props.history.push('/profile')}>PROFILE</button>
                <button onClick={() => this.props.history.push('/header')}>MAIN MENU</button>
            </div>
            <div>
            <button onClick={this.createMonster}>Create Monster</button>
                <div>
                    <h2>Monster Name:</h2>
                    <p>{this.state.monsterName}</p>
                    <input onChange={this.handleMonsterNameInput}></input>
                </div>
                <div>
                    <h2>Monster Class:</h2>
                    <p>{this.state.monsterClass}</p>
                    <input onChange={this.handleMonsterClassInput}></input>
                </div>
                <div>
                    <h2>Monster Health:</h2>
                    <p>{this.state.monsterHealth}</p>
                    <button onClick={() =>this.setState({healthList:!this.state.healthList})}>Health List</button>
                    {this.state.healthList === true? (
                        <div>
                        <button onClick={() =>this.setState({monsterHealth:10})}>10</button>
                        <button onClick={() =>this.setState({monsterHealth:12})}>12</button>
                        <button onClick={() =>this.setState({monsterHealth:15})}>15</button>
                        <button onClick={() =>this.setState({monsterHealth:20})}>20</button>
                        <button onClick={() =>this.setState({monsterHealth:25})}>25</button>
                        </div>

                    ):(
                        null

                    )}
                    
                </div>
                <div>
                    <h2>Monster Weaknesses:</h2>
                    <p>{this.state.monsterWeaknesses}</p>
                    <button onClick={() =>this.setState({monsterWeaknessesList:!this.state.monsterWeaknessesList})}>Type List</button>
                    {this.state.monsterWeaknessesList === true ? (
                        <div>
                            <button onClick={() =>this.setState({monsterWeaknesses:'Slash'})}>Slash</button>
                            <button onClick={() =>this.setState({monsterWeaknesses:'Blunt'})}>Blunt</button>
                            <button onClick={() =>this.setState({monsterWeaknesses:'Fire'})}>Fire</button>
                            <button onClick={() =>this.setState({monsterWeaknesses:'Holy'})}>Holy</button>
                            <button onClick={() =>this.setState({monsterWeaknesses:'Dark'})}>Dark</button>
                            <button onClick={() =>this.setState({monsterWeaknesses:'Poison'})}>Poison</button>
                            <button onClick={() =>this.setState({monsterWeaknesses:'Arcane'})}>Arcane</button>
                        </div>
                            ):(
                            null
                        )}
                </div>
                <div>
                    <h2>Monster Resistances:</h2>
                    <p>{this.state.monsterResistances}</p>
                    <button onClick={() =>this.setState({monsterResistancesList:!this.state.monsterResistancesList})}>Type List</button>
                    {this.state.monsterResistancesList === true ? (
                        <div>
                            <button onClick={() =>this.setState({monsterResistances:'Slash'})}>Slash</button>
                            <button onClick={() =>this.setState({monsterResistances:'Blunt'})}>Blunt</button>
                            <button onClick={() =>this.setState({monsterResistances:'Fire'})}>Fire</button>
                            <button onClick={() =>this.setState({monsterResistances:'Holy'})}>Holy</button>
                            <button onClick={() =>this.setState({monsterResistances:'Dark'})}>Dark</button>
                            <button onClick={() =>this.setState({monsterResistances:'Poison'})}>Poison</button>
                            <button onClick={() =>this.setState({monsterResistances:'Arcane'})}>Arcane</button>
                        </div>
                            ):(
                            null
                        )}
                    
                </div>
                <div>
                    <h2>Monster Attack 1 Name:</h2>
                    <p>{this.state.monsterAttack1Name}</p>
                    <input onChange={this.handleMonsterAttack1NameInput}></input>
                </div>
                <div>
                    <h2>Monster Attack 1 Type:</h2>
                     <p>{this.state.monsterAttack1Type}</p>
                    <button onClick={() =>this.setState({type1List:!this.state.type1List})}>Type List</button>
                    {this.state.type1List === true ? (
                        <div>
                            <button onClick={() =>this.setState({monsterAttack1Type:'Slash'})}>Slash</button>
                            <button onClick={() =>this.setState({monsterAttack1Type:'Blunt'})}>Blunt</button>
                            <button onClick={() =>this.setState({monsterAttack1Type:'Fire'})}>Fire</button>
                            <button onClick={() =>this.setState({monsterAttack1Type:'Holy'})}>Holy</button>
                            <button onClick={() =>this.setState({monsterAttack1Type:'Dark'})}>Dark</button>
                            <button onClick={() =>this.setState({monsterAttack1Type:'Poison'})}>Poison</button>
                            <button onClick={() =>this.setState({monsterAttack1Type:'Arcane'})}>Arcane</button>
                            <button onClick={() =>this.setState({monsterAttack1Type:'Heal'})}>Heal</button>
                            
                        </div>

                    ):(
                        null
                    )}
                    
                </div>
                <div>
                    <h2>Monster Attack 1 Damage:</h2>
                    <p>{this.state.monsterAttack1Damage}</p>
                    <button onClick={() => this.setState({monsterAttack1DamageList:!this.state.monsterAttack1DamageList})}>Damage List</button>
                    {this.state.monsterAttack1DamageList === true ? (
                        <div>
                        <button onClick={() =>this.setState({monsterAttack1Damage:3})}>3</button>
                        <button onClick={() =>this.setState({monsterAttack1Damage:5})}>5</button>
                        <button onClick={() =>this.setState({monsterAttack1Damage:8})}>8</button>
                        <button onClick={() =>this.setState({monsterAttack1Damage:10})}>10</button>
                        </div>

                    ):(
                        null
                    )}
                </div>
                <div>
                    <h2>Monster Attack 2 Name:</h2>
                    <p>{this.state.monsterAttack2Name}</p>
                    <input onChange={this.handleMonsterAttack2NameInput}></input>
                </div>
                <div>
                    <h2>Monster Attack 2 Type:</h2>
                    <p>{this.state.monsterAttack2Type}</p>
                    <button onClick={() =>this.setState({type2List:!this.state.type2List})}>Type List</button>
                    {this.state.type2List === true ? (
                        <div>
                            <button onClick={() =>this.setState({monsterAttack2Type:'Slash'})}>Slash</button>
                            <button onClick={() =>this.setState({monsterAttack2Type:'Blunt'})}>Blunt</button>
                            <button onClick={() =>this.setState({monsterAttack2Type:'Fire'})}>Fire</button>
                            <button onClick={() =>this.setState({monsterAttack2Type:'Holy'})}>Holy</button>
                            <button onClick={() =>this.setState({monsterAttack2Type:'Dark'})}>Dark</button>
                            <button onClick={() =>this.setState({monsterAttack2Type:'Poison'})}>Poison</button>
                            <button onClick={() =>this.setState({monsterAttack2Type:'Arcane'})}>Arcane</button>
                            <button onClick={() =>this.setState({monsterAttack2Type:'Heal'})}>Heal</button>
                            </div>
                            ):(
                            null
                        )}
                        </div>
                <div>
                    <h2>Monster Attack 2 Damage:</h2>
                    <p>{this.state.monsterAttack2Damage}</p>
                    <button onClick={() => this.setState({monsterAttack2DamageList:!this.state.monsterAttack2DamageList})}>Damage List</button>
                    {this.state.monsterAttack2DamageList === true ? (
                        <div>
                        <button onClick={() =>this.setState({monsterAttack2Damage:3})}>3</button>
                        <button onClick={() =>this.setState({monsterAttack2Damage:5})}>5</button>
                        <button onClick={() =>this.setState({monsterAttack2Damage:8})}>8</button>
                        <button onClick={() =>this.setState({monsterAttack2Damage:10})}>10</button>
                        </div>
                    ):(
                        null
                    )}
                </div>
                <div>
                    <h2>Monster XP Reward:</h2>
                    <p>{this.state.xpReward}</p>
                    <button onClick={() => this.setState({xpList:!this.state.xpList})}>XP List</button>
                    {this.state.xpList === true? (
                        <div>
                        <button onClick={() =>this.setState({xpReward:3})}>3</button>
                        <button onClick={() =>this.setState({xpReward:5})}>5</button>
                        <button onClick={() =>this.setState({xpReward:8})}>8</button>
                        <button onClick={() =>this.setState({xpReward:12})}>12</button>
                        <button onClick={() =>this.setState({xpReward:15})}>15</button>
                        </div>
                    ):(
                        null
                    )}
                </div>
                <div>
                    <h2>Monster Score Reward:</h2>
                    <p>{this.state.scoreReward}</p>
                    <button onClick={() => this.setState({scoreList:!this.state.scoreList})}>Score List</button> 
                    {this.state.scoreList === true? (
                        <div>
                        <button onClick={() =>this.setState({scoreReward:20})}>20</button>
                        <button onClick={() =>this.setState({scoreReward:40})}>40</button>
                        <button onClick={() =>this.setState({scoreReward:60})}>60</button>
                        <button onClick={() =>this.setState({scoreReward:80})}>80</button>
                        <button onClick={() =>this.setState({scoreReward:100})}>100</button>
                        </div>
                    ):(
                        null
                    )}
                </div>
            </div>
            </>
        )
    }
}

const mapStateToProps = reduxState =>{
    return{
        reduxState
    }
}

export default connect(mapStateToProps)(withRouter(MonsterCreator))