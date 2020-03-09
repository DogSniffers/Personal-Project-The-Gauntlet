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
    fetchUserMonsters: (req,res) => {
        const db = req.app.get('db')
        let monsters = db.fetch_usermonsters()
        return res.status(200).send(monsters)
    },
    

}