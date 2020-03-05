import React from 'react'
import axios from 'axios'

class Combat extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            floor:1,
            score:0,

            health:0,
            maxHealth:0,
            attack1name:'',
            attack1damage:0,
            attack1type:'',
            attack2name:'',
            attack2damage:0,
            attack2type:'',
            block:0,
            // BLOCK 10 MEANS CRIT, NO DAMAGE
            playerDead:false,

            level:1,
            currentXp:0,
            xpToLevel:10,
            levelUp:false,

            
            combatLog:[],
            turn:0,
            monsterAttackDamage:0,

            monsterList:[],
            monsterName:'Test',
            monsterClass:'',
            monsterHealth:40,
            monsterDefense:0,
            monsterAttack1name:'TestAttack1',
            monsterAttack1damage:0,
            monsterAttack2name:'TestAttack2',
            monsterAttack2damage:0,
            monsterWeaknesses:'Holy',
            monsterResistances:'Slash',
            monsterScoreReward:0,
            monsterXPReward:0,

            monsterDead:false,

        }
    }

    componentDidMount(){
        this.setState({health:this.props.health, maxHealth:this.props.health, attack1name:this.props.attack1name, attack1damage:this.props.attack1damage, attack1type:this.props.attack1type, 
        attack2name:this.props.attack2name, attack2damage:this.props.attack2damage, attack2type:this.props.attack2type,})
        axios.get('/api/monsters').then(res =>{
            this.setState({monsterList:res.data})
            let spawnMonster = res.data
            var random = Math.floor(Math.random() * this.state.monsterList.length) 
        })

    }

    attack1action = () => {
        let random = Math.floor(Math.random() * 10)
        console.log(random)
        if(random === 0){
            this.setState({combatLog:[...this.state.combatLog, `MISSED! (CRIT FAILURE!)` ]})
        }
        else if(random === 9){
            if(this.state.attack1type === 'Heal'){
                this.setState({health:this.state.maxHealth})
                this.setState({combatLog:[...this.state.combatLog, `Used ${this.state.attack1name} to heal to full! (CRIT!)` ]})
            }else if(this.state.attack1type === 'Block'){
                    this.setState({combatLog:[...this.state.combatLog, `Used ${this.state.attack1name} to block enemies attack! (CRIT!)` ], block:10})
                    // BLOCK 10 MEANS NO DAMAGE IN MONSTER ATTACK CODE
            }else{
            let damage = this.state.attack1damage * 2.5
            let monsterHealth = this.state.monsterHealth
            let afterAttackHealth = monsterHealth - damage
            this.setState({monsterHealth:afterAttackHealth})
            this.setState({combatLog:[...this.state.combatLog, `${this.state.attack1name} for ${damage} damage! (CRIT!)` ]})
            if(afterAttackHealth <= 0){
                this.setState({monsterDead:true})}
            }
        }
         else if(this.state.attack1type === 'Heal'){
            let health = this.state.attack1damage + this.state.health
            if(health > this.state.maxHealth){
                this.setState({health:this.state.maxHealth})
                this.setState({combatLog:[...this.state.combatLog, `Used ${this.state.attack1name} to heal to full!` ]})
            }else{
                this.setState({health:health})
                this.setState({combatLog:[...this.state.combatLog, `Used${this.state.attack1name} to heal for ${this.state.attack1damage} health!` ]})
            }
        }else if(this.state.attack1type === 'Block'){
            this.setState({combatLog:[...this.state.combatLog, `Used${this.state.attack1name} to block for ${this.state.attack1damage} damage!` ],block:this.state.attack1damage})

        }else if(this.state.attack1type === this.state.monsterWeaknesses){
            let damage = this.state.attack1damage * 1.5
            let monsterHealth = this.state.monsterHealth
            let afterAttackHealth = monsterHealth - damage
            this.setState({monsterHealth:afterAttackHealth})
            this.setState({combatLog:[...this.state.combatLog, `${this.state.attack1name} for ${damage} damage! (EFFECTIVE!)` ]})
            if(afterAttackHealth <= 0){
                this.setState({monsterDead:true})
            }
        }else if(this.state.attack1type === this.state.monsterResistances){
            let damage = this.state.attack1damage * 0.5
            let monsterHealth = this.state.monsterHealth
            let afterAttackHealth = monsterHealth - damage
            this.setState({monsterHealth:afterAttackHealth})
            this.setState({combatLog:[...this.state.combatLog, `${this.state.attack1name} for ${damage} damage! (RESISTED!)` ]})
            if(afterAttackHealth <= 0){
                this.setState({monsterDead:true})
            }
        }else{
            let damage = this.state.attack1damage
            let monsterHealth = this.state.monsterHealth
            let afterAttackHealth = monsterHealth - damage
            this.setState({monsterHealth:afterAttackHealth})
            this.setState({combatLog:[...this.state.combatLog, `${this.state.attack1name} for ${damage} damage!` ]})
            if(afterAttackHealth <= 0){
                this.setState({monsterDead:true})
            }
        }
    }
    attack2action = () => {
        let random = Math.floor(Math.random() * 10)
        if(random === 0){
            this.setState({combatLog:[...this.state.combatLog, `MISSED! (CRIT FAILURE!)` ]})
        }
         else if(random === 9){
            if(this.state.attack1type === 'Heal'){
                this.setState({health:this.state.maxHealth})
                this.setState({combatLog:[...this.state.combatLog, `Used ${this.state.attack2name} to heal to full! (CRIT!)` ]})
            }else if(this.state.attack1type === 'Block'){
                this.setState({combatLog:[...this.state.combatLog, `Used ${this.state.attack2name} to block enemies attack! (CRIT!)` ], block:10})
                // BLOCK 10 MEANS NO DAMAGE IN MONSTER CODE
            }else{
            let damage = this.state.attack1damage * 2.5
            let monsterHealth = this.state.monsterHealth
            let afterAttackHealth = monsterHealth - damage
            this.setState({monsterHealth:afterAttackHealth})
            this.setState({combatLog:[...this.state.combatLog, `${this.state.attack1name} for ${damage} damage! (CRIT!)` ]})
            if(afterAttackHealth <= 0){
                this.setState({monsterDead:true})}
            }
        }
        else if(this.state.attack2type === 'Heal'){
            let health = this.state.attack2damage + this.state.health
            if(health > this.state.maxHealth){
                this.setState({health:this.state.maxHealth})
                this.setState({combatLog:[...this.state.combatLog, `Used ${this.state.attack2name} to heal to full!` ]})
            }else{
                this.setState({health:health})
                this.setState({combatLog:[...this.state.combatLog, `Used${this.state.attack2name} to heal for ${this.state.attack2damage} health!` ]})
            }
        }else if(this.state.attack2type === 'Block'){
            this.setState({combatLog:[...this.state.combatLog, `Used${this.state.attack2name} to block for ${this.state.attack1damage} damage!` ], block:this.state.attack2damage})
        }else if(this.state.attack2type === this.state.monsterWeaknesses){
            let damage = this.state.attack2damage * 1.5
            let monsterHealth = this.state.monsterHealth
            let afterAttackHealth = monsterHealth - damage
            this.setState({monsterHealth:afterAttackHealth})
            this.setState({combatLog:[...this.state.combatLog, `${this.state.attack2name} for ${damage} damage! (EFFECTIVE!)` ]})
            if(afterAttackHealth <= 0){
                this.setState({monsterDead:true})
            }
        }else if(this.state.attack2type === this.state.monsterResistances){
            let damage = this.state.attack2damage * 0.5
            let monsterHealth = this.state.monsterHealth
            let afterAttackHealth = monsterHealth - damage
            this.setState({monsterHealth:afterAttackHealth})
            this.setState({combatLog:[...this.state.combatLog, `${this.state.attack2name} for ${damage} damage! (RESISTED!)` ]})
            if(afterAttackHealth <= 0){
                this.setState({monsterDead:true})
            }
        }else{
            let damage = this.state.attack2damage
            let monsterHealth = this.state.monsterHealth
            let afterAttackHealth = monsterHealth - damage
            this.setState({monsterHealth:afterAttackHealth})
            this.setState({combatLog:[...this.state.combatLog, `${this.state.attack2name} for ${damage} damage!` ]})
            if(afterAttackHealth <= 0){
                this.setState({monsterDead:true})
            }
        }
    }
    nextFloor = () => {
        let floor = this.state.floor
        this.setState({floor:floor + 1,monsterDead:false})
    }

    render(){
        console.log(this.state.monsterName)
        return(
            <div>
                <div>
                    <h2>Floor:{this.state.floor}</h2>
                    <h2>Score:{this.state.score}</h2>
                </div>
                <div>
                    <p>Health:{this.state.health}</p>
                    <p>Max Health:{this.state.maxHealth}</p>
                    <p>Level:{this.state.level}</p>
                </div>
                <div>
                    <h2>{this.state.monsterName}</h2>
                    <p>Health:{this.state.monsterHealth}</p>
                    <div>
                        <h2>Monster Attacks:</h2>
                        <p>{this.state.monsterAttack1name}</p>
                        <p>{this.state.monsterAttack2name}</p>
        

                    </div>
                </div>
                <div className='attacks'>
                    <h2>{this.state.attack1name}</h2>
                    <p>Damage:{this.state.attack1damage}</p>
                    <p>Type:{this.state.attack1type}</p>
                    {this.state.monsterDead === false ? (
                        <button onClick={this.attack1action}>Attack</button>
                    ):(
                        <p/>
                    )}
                </div>
                <div className='attacks'>
                    <h2>{this.state.attack2name}</h2>
                    <p>Damage:{this.state.attack2damage}</p>
                    <p>Type:{this.state.attack2type}</p>
                    {this.state.monsterDead === false ? (
                        <button onClick={this.attack2action}>Attack</button>
                    ):(
                        <p/>
                    )}
                </div>
                    <div>
                        <h2>Combat Log:</h2>
                        {this.state.combatLog}
                    <div>
                        {this.state.monsterDead === true ? (
                            <button onClick={this.nextFloor}>Next Floor</button>
                        ):(
                            null
                        )}
                    </div>
                    
                
                
            </div>
        </div>
        )
    }

}

export default Combat