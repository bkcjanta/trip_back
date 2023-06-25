const express = require("express");
const userRoute = express.Router();
const { usersModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


userRoute.post("/signup", async (req, res) => {
    const { name, email, mobile, password } = req.body;
    console.log(req.body);
    const isUser = await usersModel.findOne({ "email": email });
    if (isUser) {
        res.status(400).send({ msg: "User already exists!" });
    } else {
        try {
            hash = await bcrypt.hash(password, 10);
            if (hash) {
                const newUser = new usersModel({ name, email, password: hash, mobile });
                const user = await newUser.save();
                user.password = undefined;
                res.status(200).send({ msg: "User Created Successfully!", data: user });
            } else {
                res.status(400).send({ msg: "something wrong!" });
            }
        } catch (err) {
            console.log(err);
            res.status(400).send({ msg: "something wrong!" });
        }
    }
})


userRoute.post("/login", async (req, res) => {
    let { email, password } = req.body;
    try {
        let user = await usersModel.findOne({ email });
        if (user) {
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (isPasswordMatch) {
                const token = jwt.sign({ userId: user._id, usertype: user.type }, process.env.ACCESS_TOKEN_PRIVATE_KEY);

                let userObj = {
                    name: user.name,
                    email: user.email,
                    mobile: user.mobile,
                    token: token,
                }
                res.status(200).send({ msg: "Login Success", data: userObj });
            } else {
                res.status(400).send({ msg: "Invalid Username or Password" });
            }
        } else {
            res.status(400).send({ msg: "User does not exist" });
        }

    } catch (err) {
        console.log(err);
        res.status(400).send({ msg: err.message });
    }

})


module.exports = { userRoute };