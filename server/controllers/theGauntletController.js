const classes = require('../dumdata/class')
const monsters = require('../dumdata/monsters')
const bosses = require('../dumdata/boss')

module.exports = {
    fetchClasses: (req,res) => {
        return res.status(200).send(classes)
    },
    fetchMonsters: (req,res) => {
        return res.status(200).send(monsters)
    },
    fetchBosses: (req,res) => {
        return res.status(200).send(bosses)
    },
    fetchUserMonsters: async (req,res) => {
        const db = req.app.get('db')
        let monsters = await db.fetch_usermonsters()
        return res.status(200).send(monsters)
    },
    createMonster: (req,res) => {
        const db = req.app.get('db')
        const {monsterName,monsterClass,monsterHealth,monsterWeaknesses,monsterResistances,monsterAttack1Name,monsterAttack1Type,monsterAttack1Damage,monsterAttack2Name,monsterAttack2Type,monsterAttack2Damage,xpReward,scoreReward,username} = req.body
        db.create_monster([monsterName,monsterClass,monsterHealth,monsterWeaknesses,monsterResistances,monsterAttack1Name,monsterAttack1Type,monsterAttack1Damage,monsterAttack2Name,monsterAttack2Type,monsterAttack2Damage,xpReward,scoreReward,username]).then(() => {
            res.sendStatus(200)
        }).catch(err => console.log(err))
    },
    editMonster: (req,res) => {
        const{monsterName,monsterClass,monsterHealth,monsterWeaknesses,monsterResistances,monsterAttack1Name,monsterAttack1Type,monsterAttack1Damage,monsterAttack2Name,monsterAttack2Type,monsterAttack2Damage,xpReward,scoreReward,id} = req.body
        const db = req.app.get('db')
        db.edit_monster([monsterName,monsterClass,monsterHealth,monsterWeaknesses,monsterResistances,monsterAttack1Name,monsterAttack1Type,monsterAttack1Damage,monsterAttack2Name,monsterAttack2Type,monsterAttack2Damage,xpReward,scoreReward,id]).then(() =>{
            res.sendStatus(200)
        }).catch(() => {
            res.sendStatus(500)
        })
    },
    deleteMonster: (req,res) => {
        const {id} = req.params
        const db = req.app.get('db')
        console.log(id)
        db.delete_monster([id]).then(() => {
            res.sendStatus(201)
        }).catch( () => {
            res.sendStatus(500)
        })
    },
    fetchMyMonsters: async (req,res) => {
        const db = req.app.get('db')
        const {username} = req.body
        let data = await db.fetch_mymonsters([username])
        if(data){
            res.status(200).send(data)
        }else{
            res.sendStatus(500)
        }
    },
    
    
    

}