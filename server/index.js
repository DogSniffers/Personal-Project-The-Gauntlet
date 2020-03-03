require('dotenv').config()
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;
const app = express();
app.use(express.json())
const authController = require('./controllers/authController')

app.use(
    session({
        resave:false,
        saveUninitialized:true,
        rejectUnauthorized:false,
        cookie:{maxAge: 1000*60*60},
        secret:SESSION_SECRET
    })
)
massive({
    connectionString:CONNECTION_STRING,
    ssl:{
        rejectUnauthorized:false
    }
}).then(db => {
    const port = SERVER_PORT
    app.set('db',db)
    app.listen(port || 6542, () => console.log(`The Gauntlet is running on ${port}`))
})

// User Stuff:
// axios.post('/api/login', authController.login)
// axios.post('/api/register', authController.register)
// axios.post('/api/logout', authController.logout)

// axios.put('/api/users/:id', controller.*)
// axios.delete('/api/users/:id', controller.*)

// LeaderBoard Stuff:
// axios.get('/api/leaderboard', controller.*)
// axios.post('/api/leaderboard', controller.*)

