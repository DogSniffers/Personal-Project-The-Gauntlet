import React from 'react'

class Combat extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            floor:1,
            score:0,

            health:0,
            attack1name:'',
            attack1damage:0,
            attack1type:'',
            attack2name:'',
            attack2damage:0,
            attack2type:'',

            
            
            combatLog:[],
            turn:0,
            attackDamage:0,
            monsterAttackDamage:0,
            
            monsterName:'',
            monsterClass:'',
            monsterHealth:0,
            monsterDefense:0,
            monsterAttack1name:'',
            monsterAttack1damage:0,
            monsterAttack2name:'',
            monsterAttack2damage:0,
            monsterWeaknesses:'',
            monsterResistances:'',
            monsterScoreReward:0,
            monsterXPReward:0,

        }
    }

    componentDidMount(){
        this.setState({health:this.props.health, attack1name:this.props.attack1name, attack1damage:this.props.attack1damage, attack1type:this.props.attack1type, 
        attack2name:this.props.attack2name, attack2damage:this.props.attack2damage, attack2type:this.props.attack1type,})
    }

    attack1AddAction = () => {
        this.setState({combatLog:[...this.state.combatLog, `${this.state.attack1name} for ${this.state.attackDamage} damage!` ]})
    }
    attack2AddAction = () => {
        this.setState({combatLog:[...this.state.combatLog, `${this.state.attack2name} for ${this.state.attackDamage} damage!` ]})
    }

    render(){
        return(
            <div>
                <h2>Floor:{this.state.floor}</h2>
                <h2>Score:{this.state.score}</h2>
                <p>Health{this.state.health}</p>
                <div className='attacks'>
                    <h2>{this.state.attack1name}</h2>
                    <p>Damage:{this.state.attack1damage}</p>
                    <p>Type:{this.state.attack1type}</p>
                    <button onClick={this.attack1AddAction}>Attack</button>
                </div>
                <div className='attacks'>
                    <h2>{this.state.attack2name}</h2>
                    <p>Damage:{this.state.attack2damage}</p>
                    <p>Type:{this.state.attack2type}</p>
                    <button onClick={this.attack2AddAction}>Attack</button>
                </div>
                <div>
                    <h2>Combat Log:</h2>
                    {this.state.combatLog}
                    
                
                
            </div>
        </div>
        )
    }

}

export default Combat