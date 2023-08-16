const express = require("express")
const app = express()
const mongoose = require("mongoose")
require("dotenv").config()

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to database..."))

app.use(express.json())
app.use('/api/auth', require("./endpoints/auth/authRouter"))

app.listen(3000, () => console.log("Server started..."))