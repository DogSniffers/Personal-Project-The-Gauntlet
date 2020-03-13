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

            xpreward:3,
            xpList:false,

            scorereward:20,
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
            var {monsterName,monsterClass,monsterHealth,monsterWeaknesses,monsterResistances,monsterAttack1Name, monsterAttack1Type, monsterAttack1Damage, monsterAttack2Name,monsterAttack2Type,monsterAttack2Damage,xpreward,scorereward} = this.state
            var {username} = this.props.reduxState
            axios.post('/api/monstercreator', {monsterName,monsterClass,monsterHealth,monsterWeaknesses,monsterResistances,monsterAttack1Name, monsterAttack1Type, monsterAttack1Damage, monsterAttack2Name,monsterAttack2Type,monsterAttack2Damage,xpreward,scorereward,username}).then(res => {
                alert('Monster Successfully Created!')
                
                
            }).catch(err => console.log(err))
        }
    }
    confirmChanges = () => {
        var {monsterName,monsterClass,monsterHealth,monsterWeaknesses,monsterResistances,monsterAttack1Name, monsterAttack1Type, monsterAttack1Damage, monsterAttack2Name,monsterAttack2Type,monsterAttack2Damage,xpreward,scorereward,id} = this.state

        axios.put('/api/mymonsters/confirmchanges', {monsterName,monsterClass,monsterHealth,monsterWeaknesses,monsterResistances,monsterAttack1Name, monsterAttack1Type, monsterAttack1Damage, monsterAttack2Name,monsterAttack2Type,monsterAttack2Damage,xpreward,scorereward,id}).then(res => {
            this.setState({monsterEditing:false,monsterName:'',monsterClass:'',monsterHealth:10,monsterWeaknesses:'Slash',monsterResistances:'Blunt',monsterAttack1Name:'',monsterAttack1Type:'Slash',monsterAttack1Damage:3, monsterAttack1DamageList:false,monsterAttack2Name:'',monsterAttack2Type:'Slash',monsterAttack2Damage:3,monsterAttack2DamageList:false,xpreward:3,scorereward:20,healthList:false,type1List:false,type2List:false,xpList:false,scoreList:false,monsterResistancesList:false,
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
                monsterAttack2Name:e.attack2name,monsterAttack2Type:e.attack2type,monsterAttack2Damage:e.attack2damage,xpreward:e.xpreward,scorereward:e.score,id:e.id})
            }
        })
    }

    render(){
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
                {this.state.monsterList.length !== 0?(
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
                ):(
                    null

                )}
            <div className='monsterCreator'>
                <div className='createBoxs'>
                    <h3>Monster Name:</h3>
                    <p>{this.state.monsterName}</p>
                    <input onChange={this.handleMonsterNameInput} maxLength='20'></input>
                </div>
                <div className='createBoxs'>
                    <h3>Monster Class:</h3>
                    <p>{this.state.monsterClass}</p>
                    <input onChange={this.handleMonsterClassInput} maxLength='20'></input>
                </div>
                <div className='createBoxs'>
                    <h3>Monster Health:</h3>
                    <p>{this.state.monsterHealth}</p>
                    <button onClick={() =>this.setState({healthList:!this.state.healthList})} className='listButtons'>Health List</button>
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
                <div className='createBoxs'>
                    <h3>Monster Weaknesses:</h3>
                    <p>{this.state.monsterWeaknesses}</p>
                    <button onClick={() =>this.setState({monsterWeaknessesList:!this.state.monsterWeaknessesList})} className='listButtons'>Type List</button>
                    {this.state.monsterWeaknessesList === true ? (
                        <div>
                            <button onClick={() =>this.setState({monsterWeaknesses:'Slash'})} className='typeButtons'>Slash</button>
                            <button onClick={() =>this.setState({monsterWeaknesses:'Blunt'})} className='typeButtons'>Blunt</button>
                            <button onClick={() =>this.setState({monsterWeaknesses:'Fire'})} className='typeButtons'>Fire</button>
                            <button onClick={() =>this.setState({monsterWeaknesses:'Holy'})} className='typeButtons'>Holy</button>
                            <button onClick={() =>this.setState({monsterWeaknesses:'Dark'})} className='typeButtons'>Dark</button>
                            <button onClick={() =>this.setState({monsterWeaknesses:'Poison'})} className='typeButtons'>Poison</button>
                            <button onClick={() =>this.setState({monsterWeaknesses:'Arcane'})} className='typeButtons'>Arcane</button>
                        </div>
                            ):(
                            null
                        )}
                </div>
                <div className='createBoxs'>
                    <h3>Monster Resistances:</h3>
                    <p>{this.state.monsterResistances}</p>
                    <button onClick={() =>this.setState({monsterResistancesList:!this.state.monsterResistancesList})} className='listButtons'>Type List</button>
                    {this.state.monsterResistancesList === true ? (
                        <div>
                            <button onClick={() =>this.setState({monsterResistances:'Slash'})} className='typeButtons'>Slash</button>
                            <button onClick={() =>this.setState({monsterResistances:'Blunt'})} className='typeButtons'>Blunt</button>
                            <button onClick={() =>this.setState({monsterResistances:'Fire'})} className='typeButtons'>Fire</button>
                            <button onClick={() =>this.setState({monsterResistances:'Holy'})} className='typeButtons'>Holy</button>
                            <button onClick={() =>this.setState({monsterResistances:'Dark'})} className='typeButtons'>Dark</button>
                            <button onClick={() =>this.setState({monsterResistances:'Poison'})} className='typeButtons'>Poison</button>
                            <button onClick={() =>this.setState({monsterResistances:'Arcane'})} className='typeButtons'>Arcane</button>
                        </div>
                            ):(
                            null
                        )}
                    
                </div>
                <div className='createBoxs'>
                    <h3>Monster Attack 1 Name:</h3>
                    <p>{this.state.monsterAttack1Name}</p>
                    <input onChange={this.handleMonsterAttack1NameInput} maxLength='20'></input>
                </div>
                <div className='createBoxs'>
                    <h3>Monster Attack 1 Type:</h3>
                     <p>{this.state.monsterAttack1Type}</p>
                    <button onClick={() =>this.setState({type1List:!this.state.type1List})} className='listButtons'>Type List</button>
                    {this.state.type1List === true ? (
                        <div>
                            <button onClick={() =>this.setState({monsterAttack1Type:'Slash'})} className='typeButtons'>Slash</button>
                            <button onClick={() =>this.setState({monsterAttack1Type:'Blunt'})} className='typeButtons'>Blunt</button>
                            <button onClick={() =>this.setState({monsterAttack1Type:'Fire'})} className='typeButtons'>Fire</button>
                            <button onClick={() =>this.setState({monsterAttack1Type:'Ice'})} className='typeButtons'>Ice</button>
                            <button onClick={() =>this.setState({monsterAttack1Type:'Holy'})} className='typeButtons'>Holy</button>
                            <button onClick={() =>this.setState({monsterAttack1Type:'Dark'})} className='typeButtons'>Dark</button>
                            <button onClick={() =>this.setState({monsterAttack1Type:'Poison'})} className='typeButtons'>Poison</button>
                            <button onClick={() =>this.setState({monsterAttack1Type:'Arcane'})} className='typeButtons'>Arcane</button>    
                        </div>

                    ):(
                        null
                    )}
                    
                </div>
                <div className='createBoxs'>
                    <h3>Monster Attack 1 Damage:</h3>
                    <p>{this.state.monsterAttack1Damage}</p>
                    <button onClick={() => this.setState({monsterAttack1DamageList:!this.state.monsterAttack1DamageList})} className='listButtons'>Damage List</button>
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
                <div className='createBoxs'>
                    <h3>Monster Attack 2 Name:</h3>
                    <p>{this.state.monsterAttack2Name}</p>
                    <input onChange={this.handleMonsterAttack2NameInput} maxLength='20'></input>
                </div>
                <div className='createBoxs'>
                    <h3>Monster Attack 2 Type:</h3>
                    <p>{this.state.monsterAttack2Type}</p>
                    <button onClick={() =>this.setState({type2List:!this.state.type2List})} className='listButtons'>Type List</button>
                    {this.state.type2List === true ? (
                        <div>
                            <button onClick={() =>this.setState({monsterAttack2Type:'Slash'})} className='typeButtons'>Slash</button>
                            <button onClick={() =>this.setState({monsterAttack2Type:'Blunt'})} className='typeButtons'>Blunt</button>
                            <button onClick={() =>this.setState({monsterAttack2Type:'Fire'})} className='typeButtons'>Fire</button>
                            <button onClick={() =>this.setState({monsterAttack2Type:'Ice'})} className='typeButtons'>Ice</button>
                            <button onClick={() =>this.setState({monsterAttack2Type:'Holy'})} className='typeButtons'>Holy</button>
                            <button onClick={() =>this.setState({monsterAttack2Type:'Dark'})} className='typeButtons'>Dark</button>
                            <button onClick={() =>this.setState({monsterAttack2Type:'Poison'})} className='typeButtons'>Poison</button>
                            <button onClick={() =>this.setState({monsterAttack2Type:'Arcane'})} className='typeButtons'>Arcane</button>
                            </div>
                            ):(
                            null
                        )}
                <div className='createBoxs'>
                    <h3>Monster Attack 2 Damage:</h3>
                    <p>{this.state.monsterAttack2Damage}</p>
                    <button onClick={() => this.setState({monsterAttack2DamageList:!this.state.monsterAttack2DamageList})} className='listButtons'>Damage List</button>
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
                <div className='createBoxs'>
                    <h3>Monster XP Reward:</h3>
                    <p>{this.state.xpreward}</p>
                    <button onClick={() => this.setState({xpList:!this.state.xpList})} className='listButtons'>XP List</button>
                    {this.state.xpList === true? (
                        <div>
                        <button onClick={() =>this.setState({xpreward:3})}>3</button>
                        <button onClick={() =>this.setState({xpreward:5})}>5</button>
                        <button onClick={() =>this.setState({xpreward:8})}>8</button>
                        <button onClick={() =>this.setState({xpreward:12})}>12</button>
                        <button onClick={() =>this.setState({xpreward:15})}>15</button>
                        </div>
                    ):(
                        null
                    )}
                </div>
                <div className='createBoxs'>
                    <h3>Monster Score Reward:</h3>
                    <p>{this.state.scorereward}</p>
                    <button onClick={() => this.setState({scoreList:!this.state.scoreList})} className='listButtons'>Score List</button> 
                    {this.state.scoreList === true? (
                        <div>
                        <button onClick={() =>this.setState({scorereward:20})}>20</button>
                        <button onClick={() =>this.setState({scorereward:40})}>40</button>
                        <button onClick={() =>this.setState({scorereward:60})}>60</button>
                        <button onClick={() =>this.setState({scorereward:80})}>80</button>
                        <button onClick={() =>this.setState({scorereward:100})}>100</button>
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