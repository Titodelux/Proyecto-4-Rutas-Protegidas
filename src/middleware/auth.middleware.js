// * Middleware es una función que se ejecuta como intermediario a otra función final, para guardar datos de la base de datos, o para crear rutas protegidas
const JwtStrategy = require('passport-jwt').Strategy    // ? Aquí extraemos las estrategias de inicio de sesión que vamos a usar
const extractJWT = require('passport-jwt').ExtractJwt   // ? Con esto podemos extraer infomración directa de los headers para obtener información
const passport = require('passport')                    // ? importamos passport, que es el middleware en sí

const jwtSecret = require('../../config').api.jwtSecret
const { findUserById } = require('../users/users.controllers')

// ? Son las opciones que usará nuestra estrategia
const options = {
    jwtFromRequest: extractJWT.fromAuthHeaderWithScheme('jwt'), // ? De dónde extraerá el token
    secretOrKey: jwtSecret                                      // ? Y con qué clave verificará si es correcto o no
}
passport.use(
    new JwtStrategy(options, async (tokenDecoded, done) => {
        // ? done(err, user) , retornará si hay un error o no, y si el usuario existe o no 
        try {
            const user = await findUserById(tokenDecoded.id)
            if(user){
                return done(null, tokenDecoded)
            } else{
                return done(null, false)
            }
        } catch(err) {
            return done(err, false)
        }
    }) 
)

module.exports = {
    validatedPassport: passport
}