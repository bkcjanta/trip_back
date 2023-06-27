require('dotenv').config()
const jwt = require("jsonwebtoken")

const userAuth = async (req, res, next) => {
    var token = req.body.token
    if (token) {
        try {
            const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY);
            req.body.userId = decoded.userId;
            next();
        } catch (error) {
            console.log(error)
            res.status(401).send({ Failed: "Please login again !" })
        }
    } else {
        res.status(401).send({ Failed: "Please login again !" })
    }
}

module.exports = { userAuth }