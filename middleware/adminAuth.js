require('dotenv').config()
const jwt = require("jsonwebtoken")

const adminAuth = async (req, res, next) => {
    var token = req.headers?.authorization?.split(" ")[1]
    if (token) {
        try {
            const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY)
            if (decoded.usertype === "admin") {
                next();
            } else {
                res.status(401).send({ Failed: "Not Authorized !" });
            }

        } catch (error) {
            console.log(error)
            res.status(401).send({ Failed: "Please login again !" })
        }

    } else {
        res.status(401).send({ Failed: "Please login again !" })
    }
}

module.exports = { adminAuth }