const User = require("../../model/user")
const bcrypt = require("bcrypt")

const register = async (req, res) => {
    const { username, password } = req.body
    const user = new User({ username, hash: bcrypt.hashSync(password, 1) })
    try {
        await user.save()
        res.status(201).json({ message: "User created" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = register