const { BadRequestError, UnauthorizedError } = require("../utils/errors")
const db = require("../db")

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
        const requiredFields = ["password", "first_name", "last_name", "email", "location", "date"]
        requiredFields.forEach( field => {
            if (!credentials.hasOwnProperty(field)) { // checks if this field already exists
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })

        // make sure no user already exists with email, otherwise throw error
        const existingUser = await User.fetchUserByEmail(credentials.email)
        if (existingUser) {
            throw new BadRequestError(`Duplicate email: ${credentials.email}`)
        }

        // take user password and hash it
        // LEAVE THIS OUT FIRST
        // take user email and lowercase it
        const lowercasedEmail = credentials.email.toLowerCase()
        // create new user in DB with all the info
        const result = await db.query(`
        INSERT INTO users (
            password,
            first_name,
            last_name,
            email,
            location,
            date
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, password, first_name, last_name, email, location, date;
        `, [credentials.password, credentials.first_name, credentials.last_name, lowercasedEmail, credentials.location, credentials.date])
        // return the user
        const user = result.rows[0]

        return user
    }

    static async fetchUserByEmail(email) {
        if (!email) {
            throw new BadRequestError(`No email provided!`)
        }

        const query = `SELECT * FROM users WHERE email = $1`
        const result = await db.query(query, email.toLowerCase())
        const user = result.rows[0]

        return user
    }
    
}

module.exports = User

