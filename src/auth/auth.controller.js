const { findUserByEmail } = require("../users/users.controllers")
const { comparePasswords } = require("../utils/crypto")

const checkUserCredential = async (email, password) => {
    try{
        const user = await findUserByEmail(email)
        const checkedPassword = comparePasswords(password, user.password)
        if(checkedPassword){return user}
        else{return null}
    } catch (err) {
        return null
    }
}

module.exports = checkUserCredential