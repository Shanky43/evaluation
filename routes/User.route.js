const express = require("express")
const { UserModel } = require("../model/User.model")
const UserRoute = express.Router()
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

UserRoute.post("/register", async (req, res) => {
    const { name, password, email, gender } = req.body
    try {
        bcrypt.hash(password, 5, async (error, hash) => {
            if (hash) {
                const users = new UserModel({ name, email, gender, password: hash })
                await users.save()
                res.status(200).send({ msg: "registeration successfull... " })
            } else {
                res.status(200).send({ error: error.message })
            }
        })
    } catch (error) {
        console.log(error)
        res.status(200).send({ err: "there is some Error..." })
    }
})

UserRoute.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            bcrypt.compare(password, user.password, async (error, result) => {
                if (result) {
                    const token = jwt.sign({ userId: user._id, user: user.name }, "socialMediaApp")
                    res.status(200).send({ msg: "Login successfull...", token: token })
                } else {
                    res.status(200).send({ err: error.message })
                }
            })
        } else {
            res.status(200).send({ err: "Wrong Credentials..." })
        }
    } catch (error) {
        res.status(200).send({ err: error.message })
    }
})

module.exports = {
    UserRoute
}