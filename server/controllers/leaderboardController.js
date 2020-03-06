module.exports = {
    fetchLeaderboardByScore: (req,res) => {
        const db = req.app.get('db')
        const data = db.fetch_leaderboard_byscore().then(res => {
            res.status(200).send(data)
        }).catch(() => {
            res.sendStatus(500)
        })
    },
    fetchLeaderboardByFloors: (req,res) => {
        const db = req.app.get('db')
        const data = db.fetch_leaderboard_byfloors().then(res => {
            res.status(200).send(data)
        }).catch(() => {
            res.sendStatus(500)
        })
    },
    uploadToLeaderboard: (req,res) => {
        const db = req.app.get('db')
        const {username, floors, score, deathMessage} = req.body
        db.post_to_leaderboard([username,floors,score,deathMessage]).then(res => {
            res.sendStatus(201)
        }).catch(() => {
            res.sendStatus(500)
        })
    },



}