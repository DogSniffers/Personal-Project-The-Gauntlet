import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'
import './MonsterCreator.css'

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

            monsterList:[],
            monsterEditing:false,
            id:0,
        }
    }
    componentDidMount(){
        var {username} = this.props.reduxState
        axios.post('/api/mymonsters', {username:username}).then(res =>{
            this.setState({monsterList:res.data})
        })
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
    confirmChanges = () => {
        var {monsterName,monsterClass,monsterHealth,monsterWeaknesses,monsterResistances,monsterAttack1Name, monsterAttack1Type, monsterAttack1Damage, monsterAttack2Name,monsterAttack2Type,monsterAttack2Damage,xpReward,scoreReward,id} = this.state

        axios.put('/api/mymonsters/confirmchanges', {monsterName,monsterClass,monsterHealth,monsterWeaknesses,monsterResistances,monsterAttack1Name, monsterAttack1Type, monsterAttack1Damage, monsterAttack2Name,monsterAttack2Type,monsterAttack2Damage,xpReward,scoreReward,id}).then(res => {
            this.setState({monsterEditing:false,monsterName:'',monsterClass:'',monsterHealth:10,monsterWeaknesses:'Slash',monsterResistances:'Blunt',monsterAttack1Name:'',monsterAttack1Type:'Slash',monsterAttack1Damage:3, monsterAttack1DamageList:false,monsterAttack2Name:'',monsterAttack2Type:'Slash',monsterAttack2Damage:3,monsterAttack2DamageList:false,xpReward:3,scoreReward:20,healthList:false,type1List:false,type2List:false,xpList:false,scoreList:false,monsterResistancesList:false,
            monsterWeaknessesList:false,})
            alert('Monster successfully updated!')
            var {username} = this.props.reduxState
            axios.post('/api/mymonsters', {username:username}).then(res =>{
            this.setState({monsterList:res.data})
        })
        }).catch(err => {
            console.log(err)
        })

    }
    monsterToEdit = (monsterID) => {
        this.setState({monsterEditing:true})
        this.state.monsterList.map((e) => {
            if(e.id === monsterID){
                this.setState({monsterName:e.name,monsterClass:e.class,monsterHealth:e.health,monsterWeaknesses:e.weaknesses,monsterResistances:e.resistances,monsterAttack1Name:e.attack1name,monsterAttack1Type:e.attack1type,monsterAttack1Damage:e.attack1damage,
                monsterAttack2Name:e.attack2name,monsterAttack2Type:e.attack2type,monsterAttack2Damage:e.attack2damage,xpReward:e.xp,scoreReward:e.score,id:e.id})
            }
        })
    }

    render(){
        console.log(this.state)
        return(
            <>
            <div>
                <h1 className='pageTitle'>Monster Creator</h1>
                <button onClick={() => this.props.history.push('/profile')}>PROFILE</button>
                <button onClick={() => this.props.history.push('/header')}>MAIN MENU</button>
            </div>
            <div>
                {this.state.monsterEditing === false? (
                    <button onClick={this.createMonster}>Create Monster</button>
                ):(
                    <button onClick={this.confirmChanges}>Confirm Changes</button>
                )}
            <div>
                <h2>Edit Monster:</h2>
                {this.state.monsterList.map(monster => {
                    return(
                        <div>
                            <p>{monster.name}</p>
                            {this.state.monsterEditing === false? (
                                <button onClick={() => this.monsterToEdit(monster.id)}>EDIT</button>
                            ):(
                                null
                            )}
                        </div>
                    )
                })}
            </div>
            <div className='displayBoxs'>
                <div>
                    <h3>Monster Name:</h3>
                    <p>{this.state.monsterName}</p>
                    <input onChange={this.handleMonsterNameInput} maxLength='20'></input>
                </div>
                <div>
                    <h3>Monster Class:</h3>
                    <p>{this.state.monsterClass}</p>
                    <input onChange={this.handleMonsterClassInput} maxLength='20'></input>
                </div>
                <div>
                    <h3>Monster Health:</h3>
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
                    <h3>Monster Weaknesses:</h3>
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
                    <h3>Monster Resistances:</h3>
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
                    <h3>Monster Attack 1 Name:</h3>
                    <p>{this.state.monsterAttack1Name}</p>
                    <input onChange={this.handleMonsterAttack1NameInput} maxLength='20'></input>
                </div>
                <div>
                    <h3>Monster Attack 1 Type:</h3>
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
                        </div>

                    ):(
                        null
                    )}
                    
                </div>
                <div>
                    <h3>Monster Attack 1 Damage:</h3>
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
                    <h3>Monster Attack 2 Name:</h3>
                    <p>{this.state.monsterAttack2Name}</p>
                    <input onChange={this.handleMonsterAttack2NameInput} maxLength='20'></input>
                </div>
                <div>
                    <h3>Monster Attack 2 Type:</h3>
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
                            </div>
                            ):(
                            null
                        )}
                <div>
                    <h3>Monster Attack 2 Damage:</h3>
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
                    <h3>Monster XP Reward:</h3>
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
                    <h3>Monster Score Reward:</h3>
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