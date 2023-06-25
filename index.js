const express = require("express");
const cors = require("cors");
require("dotenv").config()
const { connect } = require("./config/db")
var cookieParser = require('cookie-parser');
const { userRoute } = require("./routes/user.route");
const app = express()
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: "*", // allow to server to accept request from different origin
    methods: "*", // allow to server to accept request with different method
}));

app.get("/", (req, res) => {
    res.send("hello world");
})

//importing routes

app.use("/user", userRoute);


//connecting to database and running server
app.listen(8000, async () => {
    try {
        connect();
        console.log("DB is Connected to Sucessssfully....");
        console.log(`http://localhost:8000`);

    } catch (e) {
        console.log("DB is connected to failed!!!!!")
    }

})