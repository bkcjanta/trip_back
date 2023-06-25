const express = require("express");
const cors = require("cors");
require("dotenv").config()
const { connect } = require("./config/db")
var cookieParser = require('cookie-parser');
const date = require('date-and-time');
const { flightRoute } = require("./routes/flight.route");
const { userRoute } = require("./routes/user.route");
const { bookingRoute } = require("./routes/booking.route");
const { protectedRoute } = require("./routes/protected.route");
const { adminRoute } = require("./routes/admin.route");
const app = express()
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: "*", // allow to server to accept request from different origin
    methods: "*", // allow to server to accept request with different method
}));

app.get("/", (req, res) => {
    res.send({ message: "Welcome to Flight Booking App" });
})

app.use("/user", userRoute);
app.use("/flight", flightRoute);
app.use("/admin", adminRoute);
app.use("/booking", bookingRoute);
app.use("/admin/protected", protectedRoute);


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