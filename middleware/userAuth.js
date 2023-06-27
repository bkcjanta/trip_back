require('dotenv').config()
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userAuth = async (req, res, next) => {
    var { token } = req.body;
    console.log("token", token)
    console.log("req.body", req.body)
    console.log(req.body)
    if (token) {
        try {
            const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY);
            req.body.userId = decoded.userId;
            next();
        } catch (error) {
            console.log(error)
            res.status(401).send({ Failed: "Please login again_A !" })
        }
    } else {
        res.status(401).send({ Failed: "Please login again_B !" })
    }
}

module.exports = { userAuth }