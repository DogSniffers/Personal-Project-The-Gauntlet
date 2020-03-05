const classes = require('../dumdata/class')
const monsters = require('../dumdata/monsters')

module.exports = {
    fetchClasses: (req,res) => {
        return res.status(200).send(classes)
    },
    fetchMonsters: (req,res) => {
        return res.status(200).send(monsters)
    }
}