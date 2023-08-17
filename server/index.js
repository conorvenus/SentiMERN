const express = require("express")
const app = express()
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
require("dotenv").config()

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to database..."))

app.use(express.json())
app.use(express.static("../client/dist"))
app.use(cookieParser())
app.use('/api/auth', require("./endpoints/auth/authRouter"))
app.use('/api/predict', async (req, res) => {
    if (!req.cookies || !req.cookies._auth) return res.status(401).json({ message: "Unauthorized" })

    const token = req.cookies._auth

    try {
        jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    const text = req.body.text 

    try {
        const response = await fetch("http://127.0.0.1:8000/api/predict", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        })
        const json = await response.json()
        res.json(json)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }    
})

app.listen(3000, () => console.log("Server started..."))