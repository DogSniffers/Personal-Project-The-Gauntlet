module.exports = {
    fetchLeaderboardByScore: async (req,res) => {
        const db = req.app.get('db')
        const response = await db.fetch_leaderboard_byscore()
            if(response){
                res.status(201).send(response)
            }else{
                res.sendStatus(500)
            }
    },
    fetchLeaderboardByFloors: async (req,res) => {
        const db = req.app.get('db')
        db.fetch_leaderboard_byfloors().then(data => {
            res.status(200).send(data)
        }).catch(() => {
            res.sendStatus(500)
        })
    },
    fetchMyLeaderboard: async (req,res) => {
        const db = req.app.get('db')
        const {username} = req.body
        console.log(username)
        let response = await db.fetch_myleaderboard([username])
            if(response){
                res.status(201).send(response)
            }else{
                res.sendStatus(500)
            }
    },
    uploadToLeaderboard: async (req,res) => {
        const db = req.app.get('db')
        const {username, floor, score, deathMessage} = req.body
       let response = await db.post_to_leaderboard([username,floor,score,deathMessage])
       if(response){
           res.sendStatus(201)
       }else{
           res.sendStatus(500)
       }
    },



}