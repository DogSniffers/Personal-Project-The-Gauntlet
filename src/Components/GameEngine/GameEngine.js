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
            // BLOCK 9 MEANS CRIT, NO DAMAGE
            canAttack:true,
            playerDead:false,

            level:1,
            currentXp:0,
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
        this.setState({attackTypeUsed:this.state.attack1type,canAttack:false})
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
                    let savedXP = this.state.currentXp - this.state.xpToLevel
                    let xp2 = 0 + savedXP
                    let nextXPtoLevel = this.state.xpToLevel + 5
                    this.setState({currentXp:xp2,xpToLevel:nextXPtoLevel,levelUp:true})
                }}
            }
        }
         else if(this.state.attack1type === 'Heal'){
            let health = this.state.attack1damage + this.state.health
            if(health > this.state.maxHealth){
                this.setState({health:this.state.maxHealth})
                this.setState({combatLog:[...this.state.combatLog, `Used ${this.state.attack1name} to heal to full!` ]})
            }else{
                this.setState({health:health})
                this.setState({combatLog:[...this.state.combatLog, `Used ${this.state.attack1name} to heal for ${this.state.attack1damage} health!` ]})
            }
        }else if(this.state.attack1type === 'Block'){
            this.setState({combatLog:[...this.state.combatLog, `Used ${this.state.attack1name} to block for ${this.state.attack1damage} damage!` ],block:this.state.attack1damage})

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
                    let savedXP = this.state.currentXp - this.state.xpToLevel
                    let xp2 = 0 + savedXP
                    let nextXPtoLevel = this.state.xpToLevel + 5
                    this.setState({currentXp:xp2,xpToLevel:nextXPtoLevel,levelUp:true})
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
                let score = this.state.score +this.state.monsterScoreReward
                this.setState({monsterDead:true, currentXp:xp,score:score})
                if(xp >= this.state.xpToLevel){
                    let savedXP = this.state.currentXp - this.state.xpToLevel
                    let xp2 = 0 + savedXP
                    let nextXPtoLevel = this.state.xpToLevel + 5
                    this.setState({currentXp:xp2,xpToLevel:nextXPtoLevel,levelUp:true})
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
                    let savedXP = this.state.currentXp - this.state.xpToLevel
                    let xp2 = 0 + savedXP
                    let nextXPtoLevel = this.state.xpToLevel + 5
                    this.setState({currentXp:xp2,xpToLevel:nextXPtoLevel,levelUp:true})
                }
            }
        }
            this.monsterAttack()
        
    }
    attack2action = () => {
        this.setState({attackTypeUsed:this.state.attack1type,canAttack:false})
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
                    let savedXP = this.state.currentXp - this.state.xpToLevel
                    let xp2 = 0 + savedXP
                    let nextXPtoLevel = this.state.xpToLevel + 5
                    this.setState({currentXp:xp2,xpToLevel:nextXPtoLevel,levelUp:true})
                }}
            }
        }
        else if(this.state.attack2type === 'Heal'){
            let health = this.state.attack2damage + this.state.health
            if(health > this.state.maxHealth){
                this.setState({health:this.state.maxHealth})
                this.setState({combatLog:[...this.state.combatLog, `Used ${this.state.attack2name} to heal to full!` ]})
            }else{
                this.setState({health:health})
                this.setState({combatLog:[...this.state.combatLog, `Used ${this.state.attack2name} to heal for ${this.state.attack2damage} health!` ]})
            }
        }else if(this.state.attack2type === 'Block'){
            this.setState({combatLog:[...this.state.combatLog, `Used ${this.state.attack2name} to block for ${this.state.attack1damage} damage!` ], block:this.state.attack2damage})
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
                    let savedXP = this.state.currentXp - this.state.xpToLevel
                    let xp2 = 0 + savedXP
                    let nextXPtoLevel = this.state.xpToLevel + 5
                    this.setState({currentXp:xp2,xpToLevel:nextXPtoLevel,levelUp:true})
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
                    let savedXP = this.state.currentXp - this.state.xpToLevel
                    let xp2 = 0 + savedXP
                    let nextXPtoLevel = this.state.xpToLevel + 5
                    this.setState({currentXp:xp2,xpToLevel:nextXPtoLevel,levelUp:true})
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
                    let savedXP = this.state.currentXp - this.state.xpToLevel
                    let xp2 = 0 + savedXP
                    let nextXPtoLevel = this.state.xpToLevel + 5
                    this.setState({currentXp:xp2,xpToLevel:nextXPtoLevel,levelUp:true})
                }
            }
        }
            this.monsterAttack()
        
    }
    nextFloor = () => {
        let floor = this.state.floor
        this.setState({floor:floor + 1,monsterDead:false,combatLog:[],canAttack:true,})
    }
    levelUpHealth = () => {
        let upgradedHealth = this.state.maxHealth + 5
        let levelUpUpgradesLeft = this.state.levelUpUpgrades - 1
        this.setState({maxHealth:upgradedHealth, levelUpUpgrades:levelUpUpgradesLeft})
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
       if(this.state.monsterDead === false){
           setTimeout(() => {
               let random = Math.floor(Math.random() * 10)
               console.log(random)
               if(random > 6){
                   this.monsterDamage1()
                }else if(random <=6){
                    this.monsterDamage2()
                }
            },3000)
        }
    }

    monsterDamage1 = () => {
        console.log('hit')
        if(this.state.monsterDead === false){

            let damage = this.state.monsterAttack1damage
            if(this.state.attackTypeUsed === 'Block'){
                if(this.state.block === 10){
                    this.setState({combatLog:[...this.state.combatLog + `${this.state.monsterName} used ${this.state.monsterAttack1name}, but it was fully blocked!`],canAttack:true})
                }else{
                    let blockedDamage = damage - this.state.block
                    let health = this.state.health - blockedDamage
                    this.setState({combatLog:[...this.state.combatLog + `${this.state.monsterName} used ${this.state.monsterAttack1name} for ${blockedDamage} damage! (${this.state.block} blocked damage.)`],health:health,canAttack:true})
                }
            }else{
                let playerHealth = this.state.health - this.state.monsterAttack1damage
                this.setState({health:playerHealth})
                this.setState({combatLog:[...this.state.combatLog + `${this.state.monsterName} used ${this.state.monsterAttack1name} for ${damage} damage! `],canAttack:true})
                if(playerHealth <= 0){
                    this.setState({playerDead:true})
                }
                
            }
        }

    }
    monsterDamage2 = () => {
        console.log('hit')
        console.log(this.state.monsterDead)
        if(this.state.monsterDead === false){

            let damage = this.state.monsterAttack2damage
            if(this.state.attackTypeUsed === 'Block'){
                if(this.state.block === 10){
                    this.setState({combatLog:[...this.state.combatLog + `${this.state.monsterName} used ${this.state.monsterAttack2name}, but it was fully blocked!`],canAttack:true})
                }else{
                    let blockedDamage = damage - this.state.block
                    let health = this.state.health - blockedDamage
                    this.setState({combatLog:[...this.state.combatLog + `${this.state.monsterName} used ${this.state.monsterAttack2name} for ${blockedDamage} damage! (${this.state.block} blocked damage.)`],health:health,canAttack:true})
                }
            }else{
                let playerHealth = this.state.health - this.state.monsterAttack2damage
                this.setState({health:playerHealth})
                this.setState({combatLog:[...this.state.combatLog + `${this.state.monsterName} used ${this.state.monsterAttack2name} for ${damage} damage! `],canAttack:true})
                if(playerHealth <= 0){
                    this.setState({playerDead:true})
                }
                }
            }
            
        }
        
    render(){
        // console.log(this.state.currentXp)
        // console.log(this.state.xpToLevel)
        // console.log(this.state.levelUp)
        return(
            <div>
                <div>
                    <h2>Floor:{this.state.floor}</h2>
                    <h2>Score:{this.state.score}</h2>
                </div>
                <div>
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
                        <h2 onClick={this.monsterAttack}>Monster Attacks:</h2>
                        <p>{this.state.monsterAttack1name}</p>
                        <p>{this.state.monsterAttack2name}</p>
        

                    </div>
                </div>
                <div className='attacks'>
                    <h2>{this.state.attack1name}</h2>
                    <p>Damage:{this.state.attack1damage}</p>
                        {this.state.levelUp === true ?(
                            <button onClick={this.levelAttack1}>Upgrade Stat</button>

                        ):(
                            null
                        )}
                    <p>Type:{this.state.attack1type}</p>
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
                </div>
                <div className='attacks'>
                    <h2>{this.state.attack2name}</h2>
                    <p>Damage:{this.state.attack2damage}</p>
                        {this.state.levelUp === true ?(
                            <button onClick={this.levelAttack2}>Upgrade Stat</button>

                        ):( 
                            null
                        )}
                    <p>Type:{this.state.attack2type}</p>
                    {this.state.playerDead === false ? (
                        <>
                        {this.state.canAttack === true ? (
                            <button onClick={this.attack2action}>Attack</button>
                        ):(
                            null
                        )}
                        </>
                    ):(
                        null
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