const jwt = require("jsonwebtoken")
const userModel = require("../model/userModel")

const authantication = async function (req, res, next) {
    try {
        let token = req.headers['x-api-key']
        if (!token) return res.status(400).send({ status: false, msg: 'Token must be Present' })

        let decodedToken = await jwt.verify(token, 'secret-key-cgcy?>&*%#@^#')
        if (!decodedToken) return res.status(401).send({ status: false, msg: 'Invalid Token!' })

        req.decodedToken = decodedToken

    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }

    next()
}

const authorization = async function (req, res, next) {
    try {
        let decodedToken = req.decodedToken
        let userId = decodedToken.userId

        let user = await userModel.findById(userId)
        let id = user._id.toString()

        if (id != userId) return res.status(403).send({ status: false, msg: 'user not authorized!' })

    } catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }

    next()
}

module.exports = { authantication, authorization }