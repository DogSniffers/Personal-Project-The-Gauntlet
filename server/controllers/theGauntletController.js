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
    

}