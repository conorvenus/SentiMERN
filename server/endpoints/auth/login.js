const User = require("../../model/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const login = async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user || !bcrypt.compareSync(password, user.hash)) {
        return res.status(401).json({ error: "Incorrect username or password" })
    }
    const token = jwt.sign({ username }, process.env.JWT_SECRET)
    res.json({ token })
}

module.exports = login