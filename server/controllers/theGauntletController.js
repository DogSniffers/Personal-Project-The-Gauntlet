const classes = require('../dumdata/class')

module.exports = {
    fetchClasses: (req,res) => {
        return res.status(200).send(classes)
    }
}