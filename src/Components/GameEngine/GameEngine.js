import React from 'react'
import axios from 'axios'
import LoseMessage from '../LoseMessage/LoseMessage'
import {withRouter} from 'react-router-dom'

class Combat extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            floor:0,
            score:0,
            
            className:'',
            health:0,
            maxHealth:0,
            attack1name:'',
            attack1damage:0,
            attack1type:'',
            attack2name:'',
            attack2damage:0,
            attack2type:'',
            block:0,
            // BLOCK 9 MEANS CRIT, NO DAMAGE
            canAttack:true,
            playerDead:false,

            level:1,
            currentXp:9,
            xpToLevel:10,
            levelUp:false,
            levelUpUpgrades:2,
            
            combatLog:[],
            turn:0,
            monsterAttackDamage:0,
            attackTypeUsed:'',

            monsterList:[],
            monsterName:'Test',
            monsterClass:'',
            monsterHealth:10,
            monsterBlock:0,
            monsterAttack1name:'TestAttack1',
            monsterAttack1damage:5,
            monsterAttack2name:'TestAttack2',
            monsterAttack2damage:6,
            monsterWeaknesses:'Holy',
            monsterResistances:'Slash',
            monsterScoreReward:20,
            monsterXPReward:10,
            monsterDead:false,

            bossList:[],

        }
    }

    componentDidMount(){
        let classInfo = this.props
        this.setState({ className:classInfo.className,
            health:classInfo.health, 
            maxHealth:classInfo.health, 
            attack1name:classInfo.attack1name, 
            attack1damage:classInfo.attack1damage, 
            attack1type:classInfo.attack1type, 
            attack2name:classInfo.attack2name, 
            attack2damage:classInfo.attack2damage, 
            attack2type:classInfo.attack2type,})
        axios.get('/api/monsters').then(res =>{
            this.setState({monsterList:res.data})
            var random = Math.floor(Math.random() * this.state.monsterList.length) 
            // console.log(this.state.monsterList[random])
            let stats = this.state.monsterList[random]
            this.setState({monsterName:stats.name, 
                monsterClass:stats.class,
                monsterHealth:stats.health,
                monsterAttack1name:stats.attack1name,
                monsterAttack1damage:stats.attack1damage,
                monsterAttack2name:stats.attack2name,
                monsterAttack2damage:stats.attack2damage, 
                monsterXPReward:stats.xpReward,
                monsterScoreReward:stats.scoreReward,
                monsterResistances:stats.resistances,
                monsterWeaknesses:stats.weaknesses})
        })
        axios.get('/api/bosses').then(res => {
            this.setState({bossList:res.data})
        })

    }

    attack1action = () => {
        this.setState({attackTypeUsed:this.state.attack1type,canAttack:false})
        let random = Math.floor(Math.random() * 10)
        // console.log(random)
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
            let damage = this.state.attack1damage * 2.5 - this.state.monsterBlock
            let monsterHealth = this.state.monsterHealth
            let afterAttackHealth = monsterHealth - damage 
            this.setState({monsterHealth:afterAttackHealth})
            this.setState({combatLog:[...this.state.combatLog, `Used ${this.state.attack1name} for ${damage} damage! (CRIT!)` ]})
            if(afterAttackHealth <= 0){
                let xp = this.state.currentXp + this.state.monsterXPReward
                let score = this.state.score +this.state.monsterScoreReward
                this.setState({monsterDead:true, currentXp:xp,score:score})
                if(xp >= this.state.xpToLevel){
                    this.levelUp()       
                }}
            }
        }
         else if(this.state.attack1type === 'Heal'){
            let health = this.state.attack1damage + this.state.health
            if(health >= this.state.maxHealth){
                this.setState({health:this.state.maxHealth})
                this.setState({combatLog:[...this.state.combatLog, `Used ${this.state.attack1name} to heal to full!` ]})
            }else{
                this.setState({health:health})
                this.setState({combatLog:[...this.state.combatLog, `Used ${this.state.attack1name} to heal for ${this.state.attack1damage} health!` ]})
            }
        }else if(this.state.attack1type === 'Block'){
            this.setState({combatLog:[...this.state.combatLog, `Used ${this.state.attack1name} to block the enemies attack!` ],block:this.state.attack1damage})

        }else if(this.state.attack1type === this.state.monsterWeaknesses){
            let damage = this.state.attack1damage * 1.5 - this.state.monsterBlock
            let monsterHealth = this.state.monsterHealth
            let afterAttackHealth = monsterHealth - damage
            this.setState({monsterHealth:afterAttackHealth})
            this.setState({combatLog:[...this.state.combatLog, `Used ${this.state.attack1name} for ${damage} damage! (EFFECTIVE!)` ]})
            if(afterAttackHealth <= 0){
                let xp = this.state.currentXp + this.state.monsterXPReward
                let score = this.state.score +this.state.monsterScoreReward
                this.setState({monsterDead:true, currentXp:xp,score:score})
                if(xp >= this.state.xpToLevel){
                    this.levelUp()
                }
            }
        }else if(this.state.attack1type === this.state.monsterResistances){
            let damage = this.state.attack1damage * 0.5 - this.state.monsterBlock
            let monsterHealth = this.state.monsterHealth
            let afterAttackHealth = monsterHealth - damage
            this.setState({monsterHealth:afterAttackHealth})
            this.setState({combatLog:[...this.state.combatLog, `Used ${this.state.attack1name} for ${damage} damage! (RESISTED!)` ]})
            if(afterAttackHealth <= 0){
                let xp = this.state.currentXp + this.state.monsterXPReward
                let score = this.state.score + this.state.monsterScoreReward
                this.setState({monsterDead:true, currentXp:xp,score:score})
                if(xp >= this.state.xpToLevel){
                    this.levelUp()  
                }
            }
        }else{
            let damage = this.state.attack1damage - this.state.monsterBlock
            let monsterHealth = this.state.monsterHealth
            let afterAttackHealth = monsterHealth - damage
            this.setState({monsterHealth:afterAttackHealth})
            this.setState({combatLog:[...this.state.combatLog, `Used ${this.state.attack1name} for ${damage} damage!` ]})
            if(afterAttackHealth <= 0){
                let xp = this.state.currentXp + this.state.monsterXPReward
                let score = this.state.score +this.state.monsterScoreReward
                this.setState({monsterDead:true, currentXp:xp,score:score})
                if(xp >= this.state.xpToLevel){
                    this.levelUp()
                }
            }
        }
            this.monsterAttack()
        
    }
    attack2action = () => {
        this.setState({attackTypeUsed:this.state.attack2type,canAttack:false})
        let random = Math.floor(Math.random() * 10)
        if(random === 0){
            this.setState({combatLog:[...this.state.combatLog, `MISSED! (CRIT FAILURE!)` ]})
        }
         else if(random === 9){
            if(this.state.attack2type === 'Heal'){
                this.setState({health:this.state.maxHealth})
                this.setState({combatLog:[...this.state.combatLog, `Used ${this.state.attack2name} to heal to full! (CRIT!)` ]})
            }else if(this.state.attack2type === 'Block'){
                this.setState({combatLog:[...this.state.combatLog, `Used ${this.state.attack2name} to block enemies attack! (CRIT!)` ], block:10})
                // BLOCK 10 MEANS NO DAMAGE IN MONSTER CODE
            }else{
            let damage = this.state.attack2damage * 2.5 - this.state.monsterBlock
            let monsterHealth = this.state.monsterHealth
            let afterAttackHealth = monsterHealth - damage
            this.setState({monsterHealth:afterAttackHealth})
            this.setState({combatLog:[...this.state.combatLog, `Used ${this.state.attack2name} for ${damage} damage! (CRIT!)` ]})
            if(afterAttackHealth <= 0){
                let xp = this.state.currentXp + this.state.monsterXPReward
                let score = this.state.score +this.state.monsterScoreReward
                this.setState({monsterDead:true, currentXp:xp,score:score})
                if(xp >= this.state.xpToLevel){
                    this.levelUp()
                }}
            }
        }
        else if(this.state.attack2type === 'Heal'){
            let health = this.state.attack2damage + this.state.health
            if(health >= this.state.maxHealth){
                this.setState({health:this.state.maxHealth})
                this.setState({combatLog:[...this.state.combatLog, `Used ${this.state.attack2name} to heal to full!` ]})
            }else{
                this.setState({health:health})
                this.setState({combatLog:[...this.state.combatLog, `Used ${this.state.attack2name} to heal for ${this.state.attack2damage} health!` ]})
            }
        }else if(this.state.attack2type === 'Block'){
            this.setState({combatLog:[...this.state.combatLog, `Used ${this.state.attack2name} to block the enemies attack!` ], block:this.state.attack2damage})
        }else if(this.state.attack2type === this.state.monsterWeaknesses){
            let damage = this.state.attack2damage * 1.5 - this.state.monsterBlock
            let monsterHealth = this.state.monsterHealth
            let afterAttackHealth = monsterHealth - damage
            this.setState({monsterHealth:afterAttackHealth})
            this.setState({combatLog:[...this.state.combatLog, `Used ${this.state.attack2name} for ${damage} damage! (EFFECTIVE!)` ]})
            if(afterAttackHealth <= 0){
                let xp = this.state.currentXp + this.state.monsterXPReward
                let score = this.state.score + this.state.monsterScoreReward
                this.setState({monsterDead:true, currentXp:xp,score:score})
                if(xp >= this.state.xpToLevel){
                    this.levelUp()
                }
            }
        }else if(this.state.attack2type === this.state.monsterResistances){
            let damage = this.state.attack2damage * 0.5 - this.state.monsterBlock
            let monsterHealth = this.state.monsterHealth
            let afterAttackHealth = monsterHealth - damage 
            this.setState({monsterHealth:afterAttackHealth})
            this.setState({combatLog:[...this.state.combatLog, `Used ${this.state.attack2name} for ${damage} damage! (RESISTED!)` ]})
            if(afterAttackHealth <= 0){
                let xp = this.state.currentXp + this.state.monsterXPReward
                let score = this.state.score +this.state.monsterScoreReward
                this.setState({monsterDead:true, currentXp:xp,score:score})
                if(xp >= this.state.xpToLevel){
                    this.levelUp()
                }
            }
        }else{
            let damage = this.state.attack2damage - this.state.monsterBlock
            let monsterHealth = this.state.monsterHealth
            let afterAttackHealth = monsterHealth - damage
            this.setState({monsterHealth:afterAttackHealth})
            this.setState({combatLog:[...this.state.combatLog, `Used ${this.state.attack2name} for ${damage} damage!` ]})
            if(afterAttackHealth <= 0){
                let xp = this.state.currentXp + this.state.monsterXPReward
                let score = this.state.score +this.state.monsterScoreReward
                this.setState({monsterDead:true, currentXp:xp,score:score})
                if(xp >= this.state.xpToLevel){
                    this.levelUp()
                }
            }
        }
            this.monsterAttack()
        
    }
    nextFloor = () => {
        let floor = this.state.floor
        this.setState({floor:floor + 1,monsterDead:false,combatLog:[],canAttack:true,})
        let random = Math.floor(Math.random() * this.state.monsterList.length)
        let stats = this.state.monsterList[random]
        this.setState({monsterName:stats.name, 
            monsterClass:stats.class,
            monsterHealth:stats.health,
            monsterAttack1name:stats.attack1name,
            monsterAttack1damage:stats.attack1damage,
            monsterAttack2name:stats.attack2name,
            monsterAttack2damage:stats.attack2damage, 
            monsterXPReward:stats.xpReward,
            monsterScoreReward:stats.scoreReward,
            monsterResistances:stats.resistances,
            monsterWeaknesses:stats.weaknesses})
    }
    nextFloorBoss = () => {
        let floor = this.state.floor
        this.setState({floor:floor + 1,monsterDead:false,combatLog:[],canAttack:true,})
        let random = Math.floor(Math.random() * this.state.bossList.length)
        let stats = this.state.bossList[random]
        this.setState({monsterName:stats.name, 
            monsterClass:stats.class,
            monsterHealth:stats.health,
            monsterAttack1name:stats.attack1name,
            monsterAttack1damage:stats.attack1damage,
            monsterAttack2name:stats.attack2name,
            monsterAttack2damage:stats.attack2damage, 
         monsterXPReward:stats.xpReward,
            monsterScoreReward:stats.scoreReward,
            monsterResistances:stats.resistances,
            monsterWeaknesses:stats.weaknesses})
    }
    levelUp = () => {
        let xp = this.state.currentXp + this.state.monsterXPReward
        let savedXP = xp - this.state.xpToLevel
        let xp2 = 0 + savedXP
        let nextXPtoLevel = this.state.xpToLevel + 5
        let health = this.state.maxHealth
        let level = this.state.level + 1
        this.setState({currentXp:xp2,xpToLevel:nextXPtoLevel,levelUp:true,health:health,level:level})
    }
    levelUpHealth = () => {
        let upgradedHealth = this.state.maxHealth + 5
        let levelUpUpgradesLeft = this.state.levelUpUpgrades - 1
        this.setState({maxHealth:upgradedHealth, levelUpUpgrades:levelUpUpgradesLeft,health:upgradedHealth,})
        if(levelUpUpgradesLeft === 0){
            this.setState({levelUpUpgrades:2, levelUp:false})
        }
    }
    levelAttack1 = () => {
        let upgradedAttack = this.state.attack1damage + 1
        let levelUpUpgradesLeft = this.state.levelUpUpgrades - 1
        this.setState({attack1damage:upgradedAttack, levelUpUpgrades:levelUpUpgradesLeft})
        if(levelUpUpgradesLeft === 0){
            this.setState({levelUpUpgrades:2, levelUp:false})
        }
    }
    levelAttack2 = () => {
        let upgradedAttack = this.state.attack2damage + 1
        let levelUpUpgradesLeft = this.state.levelUpUpgrades - 1
        this.setState({attack2damage:upgradedAttack, levelUpUpgrades:levelUpUpgradesLeft})
        if(levelUpUpgradesLeft === 0){
            this.setState({levelUpUpgrades:2, levelUp:false})
        }
    }
    monsterAttack = () => {
       console.log('start')
       console.log(this.state.attackTypeUsed)
       if(this.state.monsterDead === false){
           setTimeout(() => {
               let random = Math.floor(Math.random() * 10)
               console.log(random)
               if(random > 6){
                   this.monsterDamage1()
                }else{
                    this.monsterDamage2()
                }
            },1500)
        }else{
            console.log('hit')
            this.setState({combatLog:[...this.state.combatLog, `${this.state.monsterName} has been slain!`]})
        }
    }

    monsterDamage1 = () => {
        // console.log('hit')
        // console.log(this.state.monsterDead)
        if(this.state.monsterDead === false){
            let random = Math.floor(Math.random() * 10)
            if(random !== 0){
            let damage = this.state.monsterAttack1damage
            if(this.state.attackTypeUsed === 'Block'){
                if(this.state.block === 10){
                    this.setState({combatLog:[...this.state.combatLog, `${this.state.monsterName} used ${this.state.monsterAttack1name}, but it was fully blocked!`],canAttack:true})
                }else if(this.state.block === 0){
                let playerHealth = this.state.health - this.state.monsterAttack1damage
                this.setState({health:playerHealth})
                this.setState({combatLog:[...this.state.combatLog, `${this.state.monsterName} used ${this.state.monsterAttack1name} for ${this.state.monsterAttack1damage} damage! (BLOCKED 0 DAMAGE!) `],canAttack:true})
                if(playerHealth <= 0){
                    this.setState({playerDead:true})
                }
                }else{
                    let ogHealth = this.state.health
                    let blockedDamage = damage - this.state.block
                    let health = this.state.health - blockedDamage
                    let block = this.state.block
                    if(health > ogHealth){
                        health = ogHealth
                    }
                    if(blockedDamage < 0){
                        blockedDamage = 0
                        block = this.state.monsterAttack1damage
                    }
                    this.setState({combatLog:[...this.state.combatLog, `${this.state.monsterName} used ${this.state.monsterAttack1name} for ${blockedDamage} damage! (${block} blocked damage.)`],health:health,canAttack:true})
                    if(health <= 0){
                        this.setState({playerDead:true})
                    }
                }
            }else{
                let playerHealth = this.state.health - this.state.monsterAttack1damage
                this.setState({health:playerHealth})
                this.setState({combatLog:[...this.state.combatLog, `${this.state.monsterName} used ${this.state.monsterAttack1name} for ${damage} damage! `],canAttack:true})
                if(playerHealth <= 0){
                    this.setState({playerDead:true})
                }
                
            }
        }else{
            this.setState({combatLog:[...this.state.combatLog, `${this.state.monsterName} missed!`],canAttack:true})
        }
        }else{
            this.setState({combatLog:[...this.state.combatLog, `${this.state.monsterName} has been slain!`]})
        }
    }
    monsterDamage2 = () => {
        // console.log('hit')
        // console.log(this.state.monsterDead)
        if(this.state.monsterDead === false){
            let random = Math.floor(Math.random() * 10)
            if(random !== 0){
                let damage = this.state.monsterAttack2damage
            if(this.state.attackTypeUsed === 'Block'){
                if(this.state.block === 10){
                    this.setState({combatLog:[...this.state.combatLog, `${this.state.monsterName} used ${this.state.monsterAttack2name}, but it was fully blocked!`],canAttack:true})
                }else if(this.state.block === 0){
                    let playerHealth = this.state.health - this.state.monsterAttack1damage
                this.setState({health:playerHealth})
                this.setState({combatLog:[...this.state.combatLog, `${this.state.monsterName} used ${this.state.monsterAttack2name} for ${this.state.monsterAttack2damage} damage! (BLOCKED 0 DAMAGE!) `],canAttack:true})
                if(playerHealth <= 0){
                    this.setState({playerDead:true})}
                }else{
                    let ogHealth = this.state.health
                    let blockedDamage = damage - this.state.block
                    let health = this.state.health - blockedDamage
                    let block = this.state.block
                    if(health > ogHealth){
                        health = ogHealth
                    }
                    if(blockedDamage < 0){
                        blockedDamage = 0
                        block = this.state.monsterAttack1damage
                    }
                    this.setState({combatLog:[...this.state.combatLog, `${this.state.monsterName} used ${this.state.monsterAttack2name} for ${blockedDamage} damage! (${block} blocked damage.)`],health:health,canAttack:true})
                    if(health <= 0){
                        this.setState({playerDead:true})
                    }
                }
            }else{
                let playerHealth = this.state.health - this.state.monsterAttack2damage
                this.setState({health:playerHealth})
                this.setState({combatLog:[...this.state.combatLog, `${this.state.monsterName} used ${this.state.monsterAttack2name} for ${damage} damage! `],canAttack:true})
                if(playerHealth <= 0){
                    this.setState({playerDead:true})
                }
                }
            }else{
                this.setState({combatLog:[...this.state.combatLog, `${this.state.monsterName} missed!`],canAttack:true})
            }
            }else{
                this.setState({combatLog:[...this.state.combatLog, `${this.state.monsterName} has been slain!`]})
            }
            
        }
       
        
    render(){
        // console.log(this.state.currentXp)
        // console.log(this.state.xpToLevel)
        // console.log(this.state)
        // console.log(this.state.combatLog)
        // console.log(this.state.bossList)
        return(
            <div>
                <div>
                    <h2>Floor:{this.state.floor}</h2>
                    <h2>Score:{this.state.score}</h2>
                </div>
                <div>
                <h1>{this.state.className}</h1>
                    <p>Health:{this.state.health}/{this.state.maxHealth}</p>
                    {this.state.levelUp === true ?(
                        <button onClick={this.levelUpHealth}>Upgrade Stat</button>

                    ):(
                        null
                    )}
                    <p>XP:{this.state.currentXp}/{this.state.xpToLevel}</p>
                    <p>Level:{this.state.level}</p>
                    {this.state.playerDead === false ?(
                        <>
                        {this.state.levelUp === true ?(
                            <p>Level-Up Upgrades:{this.state.levelUpUpgrades}</p>
                            
                            ):( 
                                null
                                )}
                        </>

                    ):(
                        null
                    )}
                </div>
                <div>
                    <h2>{this.state.monsterName}</h2>
                    <p>Health:{this.state.monsterHealth}</p>
                    <div>
                        <h2>Monster Attacks:</h2>
                    <p>{this.state.monsterAttack1name}: {this.state.monsterAttack1damage} damage</p>
                    <p>{this.state.monsterAttack2name}: {this.state.monsterAttack2damage} damage</p>
        

                    </div>
                </div>
                <div className='attacks'>
                    <h2>{this.state.attack1name}</h2>
                    <p>Damage:{this.state.attack1damage}</p>
                    <p>Type:{this.state.attack1type}</p>
                        {this.state.levelUp === true ?(
                            <button onClick={this.levelAttack1}>Upgrade Stat</button>
                    ):(
                        <>
                    {this.state.playerDead === false ? (
                            <>
                            {this.state.canAttack === true ? (
                                <button onClick={this.attack1action}>Attack</button>
                        ):(
                            null
                        )}
                            </>
                        ):(
                            null
                        )}
                        </>
                    )}
                        
                </div>
                <div className='attacks'>
                    <h2>{this.state.attack2name}</h2>
                    <p>Damage:{this.state.attack2damage}</p>
                    <p>Type:{this.state.attack2type}</p>
                        {this.state.levelUp === true ?(
                            <button onClick={this.levelAttack2}>Upgrade Stat</button>

                        ):( 
                            <>
                            {this.state.playerDead === false ? (
                            <>
                            {this.state.canAttack === true ? (
                            <button onClick={this.attack2action}>Attack</button>
                        ):(
                            null)}
                            </>
                        ):(
                        null)}
                    </>)}
                </div>
                    <div>
                        <h2>Combat Log:</h2>
                        {this.state.combatLog}
                    {this.state.floor === 9? (<div>
                        {this.state.monsterDead === true ? (
                            <button onClick={this.nextFloorBoss}>Boss Floor</button>
                        ):(
                            null
                        )}
                    </div>
                    ):(
                    <div>
                        {this.state.monsterDead === true ? (
                            <button onClick={this.nextFloor}>Next Floor</button>
                        ):(
                            null
                        )}
                    </div>)}
                    {this.state.playerDead === true ? (
                        <div>
                            <LoseMessage/>
                            <button onClick={() =>this.props.history.push('/header')}>HOME</button>
                            <button>PUSH SCORE TO LEADERBOARD</button>
                        </div>

                    ):(
                        null
                    )}
            </div>
        </div>
        )
    }

}

export default withRouter(Combat)