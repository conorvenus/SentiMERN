const User = require("../../model/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const register = async (req, res) => {
    const { username, password } = req.body
    const user = new User({ username, hash: bcrypt.hashSync(password, 1) })
    try {       
        await user.save()
        res.status(201).json({ message: "User created", token: jwt.sign({ username }, process.env.JWT_SECRET) })
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ message: "Username already exists" })
        }
        res.status(500).json({ message: err.message })
    }
}

module.exports = register