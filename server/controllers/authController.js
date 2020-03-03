const bcrypt = require('bycryptjs')

module.exports = {
    login: (req,res) => {
        const {email,password}
        const {session} = req
        const db = req.app.get('db')

        let email = await db.check_email([email])
        user=email[0]
        if(!user){
            return res.status(400).send('Email is not Associated with an Account')
        }
        const authenticated = bcrypt.compareSync(password, user.password)
        if(authenticated === true){
            delete user.password
            session.user = email
            res.status(200).send(session.user)
        }else{
            res.status(400).send('Incorrect Password')
        }
    },

    register: async (req,res) => {
        const {email,password,confirmPassword,username} = req.body
        const {session} = req
        const db = req.app.get('db')
        
        let email = await db.check_email([email])
        email=email[0]
        if(email){
            return res.status(400).send('Email Already in Use')
        }
        if(password !== confirmPassword){
            return res.status(400).send('Passwords do not Match')
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password,salt)

        let newUser = await db.register({email,hash,username})
        session.user = newUser
        res.status(200).send(session.user)
    },

    logout: (req,res) => {
        req.session.destroy
        res.sendStatus(200)
    },
}