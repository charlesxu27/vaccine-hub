const { UnauthorizedError } = require("../utils/errors")

class User {
    static async login(credentials) {
        // submit email and password
        // otherwise, throw error

        // look up user in DB by email
        // if found, compare passwords
        // if password matches DB password, return the user
        // otherwise, throw unauthorized error
        throw new UnauthorizedError("Invalid Email or Password")

    }

    static async register(credentials) {
        // submit email, password, vaccine info, etc.
        // if any of the fields are missing, throw an error
        // make sure no user already exists with email, otherwise throw error

        // take user password and hash it
        // take user email and lowercase it
        // create new user in DB with all the info
        // return the user
    }
    
}

module.exports = User

