const express = require("express")
const { connection } = require("./db")
const { UserRoute } = require("./routes/User.route")
const { auth } = require("./middleware/auth.middleware")
const { PostRoute } = require("./routes/Post.rourte")
require("dotenv").config()

const app = express()
app.use(express.json())

app.use("/users", UserRoute)
app.use(auth)
app.use("/posts", PostRoute)

app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
        console.log("Something went wrong with Connecting to DB")
    }
    console.log(`Server is Running Successfully at port ${process.env.PORT}`)
})