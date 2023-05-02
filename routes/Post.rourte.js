const express = require("express")
const { PostModel } = require("../model/Post.model")
const PostRoute = express.Router()

PostRoute.get("/", async (req, res) => {
    const { device } = req.query
    let query = {
        userID: req.body.userID
    }
    if (device) {
        query.device = device
    }


    const posts = await PostModel.find(query)
    res.status(200).send(posts)
})

PostRoute.post("/create", async (req, res) => {
    try {
        const posts = new PostModel(req.body)
        await posts.save()
        res.status(200).send("Post added...")
    } catch (error) {
        res.status(200).send({ error: error.message })
    }
})

PostRoute.patch("/update/:id", async (req, res) => {
    const { id } = req.params
    const posts = await PostModel.findOne({ _id: id })
    console.log(posts, "line")
    try {
        if (req.body.userID !== posts.userID) {
            res.status(200).send({ error: "You need authorization to modify" })
        } else {
            await PostModel.findByIdAndUpdate({ _id: id }, req.body)
            res.status(200).send({ msg: `The post has been updated with id:${id}` })
        }
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})
PostRoute.delete("/delete/:id", async (req, res) => {
    const { id } = req.params
    const posts = await PostModel.findOne({ _id: id })
    try {
        if (req.body.userID !== posts.userID) {
            res.status(200).send({ error: "You need authorization to modify" })
        } else {
            await PostModel.findByIdAndDelete({ _id: id })
            res.status(200).send({ msg: `The post has been deleted with id:${id}` })
        }
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})
module.exports = { PostRoute }