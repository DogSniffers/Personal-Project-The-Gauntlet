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
    uploadToLeaderboard: async (req,res) => {
        const db = req.app.get('db')
        const {username, floor, score, deathMessage} = req.body
        console.log(typeof(floor),typeof(score))
       let response = await db.post_to_leaderboard([username,floor,score,deathMessage])
       if(response){
           res.sendStatus(201)
       }else{
           res.sendStatus(500)
       }
    },



}