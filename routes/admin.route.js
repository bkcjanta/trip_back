const express = require("express");
const adminRoute = express.Router();
const { usersModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// admin signup


adminRoute.post("/signup", async (req, res) => {
    const { name, email, mobile, password } = req.body;
    console.log(req.body);
    const isUser = await usersModel.findOne({ "email": email });
    if (isUser) {
        res.status(400).send({ msg: "Email already exists!" });
    } else {
        try {
            hash = await bcrypt.hash(password, 10);
            if (hash) {
                const newUser = new usersModel({ name, email, password: hash, mobile, type: "admin" });
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
}
);

// admin login

adminRoute.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await usersModel.findOne({ email: email });
        if (admin) {
            if (admin.type === "admin") {
                const isPasswordMatch = await bcrypt.compare(password, admin.password);
                if (isPasswordMatch) {
                    const token = jwt.sign({ userID: admin._id, usertype: admin.type }, process.env.ACCESS_TOKEN_PRIVATE_KEY)

                    let userObj = {
                        name: admin.name,
                        email: admin.email,
                        mobile: admin.mobile,
                        token: token,
                    }
                    res.status(200).send({ msg: "Login Success", data: userObj });
                } else {
                    res.status(400).send({ msg: "Invalid Username or Password" });
                }
            } else {
                res.status(400).send({ msg: "Wrong credentials" });
            }
        } else {
            res.status(400).send({ msg: "User does not exist" });

        }

    } catch (error) {

    }
});


module.exports = { adminRoute };