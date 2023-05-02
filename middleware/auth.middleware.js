var jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    const token = req.headers.authorization
    if (token) {
        try {
            const decoded = jwt.verify(token.split(" ")[1], "socialMediaApp")
            if (decoded) {
                console.log(decoded)
                req.body.userID = decoded.userId
                req.body.user = decoded.user
                next()
            } else {
                res.status(200).send("Login First...")
            }
        } catch (error) {
            res.status(200).send({ error: error.message })
        }
    } else {
        res.status(200).send("Login First...")
    }
}

module.exports = { auth }