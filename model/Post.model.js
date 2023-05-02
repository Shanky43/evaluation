const mongoose = require("mongoose")

const PostSchema = mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    device: { type: String, required: true },
    user: { type: String, required: true },
    userID: { type: String, required: true }
})

const PostModel = mongoose.model("post", PostSchema)

module.exports = {
    PostModel
}