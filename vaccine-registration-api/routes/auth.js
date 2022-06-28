const express = require("express")
const router = express.Router()

router.post("/login", async (req, res, next) => {
    try {
        // take login info and try to authenticate

    } catch (err) {
        next(err)
    }
})

router.post("/register", async (req, res, next) => {
    try {
        // take user email password and other info and create new user in DB

    } catch (err) {
        next(err)
    }
})


module.exports = router