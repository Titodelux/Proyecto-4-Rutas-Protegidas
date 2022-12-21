const jwt = require('jsonwebtoken')
const checkUserCredential = require('./auth.controller')
const jwtSecret = require('../../config').api.jwtSecret


const postLogin = (req, res) => {
    const { email, password } = req.body
    if(email && password){
        checkUserCredential(email, password)
        .then(data => {
            if(data){
                const token = jwt.sign({
                    id: data.id,
                    email: data.email,
                    role: data.role
                }, jwtSecret)
                res.status(200).json({
                    message: 'correct credentials',
                    token,
                })
            } else{
                res.status(401).json({
                    message: 'invalid credentials'
                })
            }
        })
        .catch(err => res.status(400).json({message: err.message }))
    } else{
        res.status(400).json({message: 'missing data', fields:{email: 'example@example.com', password: 'string'}})
    }
}

module.exports = postLogin