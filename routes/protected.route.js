const express = require("express");
const protectedRoute = express.Router();
const { bookingModel } = require("../models/booking.model");
const { flightModel } = require("../models/flight.model");
const { usersModel } = require("../models/user.model");

// flight section ------------------------------------------- flight section ------------------------------------------------- flight section

// get all flights

protectedRoute.get("/flight/all", async (req, res) => {
    try {
        const trips = await flightModel.find().sort({ createdAt: -1 });
        res.status(200).send({ data: trips });
    } catch (err) {
        console.log(err);
        res.status(400).send({ msg: err.message });
    }
}
);

// get a flight details
protectedRoute.get("/flight/details/:id", async (req, res) => {
    const { id } = req.params;
    console.log("id", id);
    try {
        const trip = await flightModel.findById(id);
        res.status(200).send({ "msg": "flight details", data: trip });
    } catch (err) {
        console.log(err);
        res.status(400).send({ msg: err.message, "error": "err" });
    }
}
);

// add flight 

protectedRoute.post("/flight/add", async (req, res) => {
    const { from, to, departureTime, arrivalTime, duration, seats, price, stops, airline, image, description, flightDays } = req.body;

    try {
        const newTrip = new flightModel({ from, to, departureTime, arrivalTime, seats, price, duration, stops, airline, image, description, flightDays });
        const trip = await newTrip.save();
        res.status(200).send({ msg: "New Flight Created Successfully!", data: trip });
    } catch (err) {
        console.log(err);
        res.status(400).send({ msg: err.message });
    }
}
);

// update a flight
protectedRoute.put("/flight/update/:id", async (req, res) => {
    const { id } = req.params;
    const { from, to, departureTime, arrivalTime, duration, seats, price, stops, airline, image, description, flightDays, flightStatus } = req.body;
    try {
        const trip = await flightModel.findByIdAndUpdate(id, { from, to, departureTime, arrivalTime, duration, seats, price, stops, airline, image, description, flightDays, flightStatus });
        const updatedTrip = await flightModel.findById(id);
        res.status(200).send({ msg: "Flight Updated Successfully!", data: updatedTrip });
    } catch (err) {
        console.log(err);
        res.status(400).send({ msg: err.message });
    }
}
);

// delete a flight
protectedRoute.delete("/flight/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const trip = await flightModel.findByIdAndDelete(id);
        res.status(200).send({ msg: "Flight Deleted Successfully!", data: trip });
    } catch (err) {
        console.log(err);
        res.status(400).send({ msg: err.message });
    }
}
);

// Booking Section ------------------------------------------- Booking Section ------------------------------------------------- Booking Section

// get all bookings
protectedRoute.get("/bookings/all", async (req, res) => {
    try {
        const bookings = await bookingModel.find().populate("flightId").populate("userId");
        res.status(200).send({ data: bookings });
    } catch (err) {
        console.log(err);
        res.status(400).send({ msg: err.message });
    }
}
);

// update a booking
protectedRoute.put("/booking/update/:id", async (req, res) => {
    const { id } = req.params;
    const { flightId, userId, seats, passengers, totalPrice, bookingStatus } = req.body;
    try {
        const booking = await bookingModel.findByIdAndUpdate(id, { flightId, userId, seats, passengers, totalPrice, bookingStatus });
        const updatedBooking = await bookingModel.findById(id);
        res.status(200).send({ msg: "Booking Updated Successfully!", data: updatedBooking });
    } catch (err) {
        console.log(err);
        res.status(400).send({ msg: err.message });
    }
}
);


// get all bookings of a flight
protectedRoute.get("/booking/flight/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const bookings = await bookingModel.find({ flightId: id });
        res.status(200).send({ msg: "Bookings of a Flight", data: bookings });
    } catch (err) {
        console.log(err);
        res.status(400).send({ msg: err.message });
    }
}
);

// get all bookings of a user
protectedRoute.get("/booking/user/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const bookings = await bookingModel.find({ userId: id });
        res.status(200).send({ msg: "Bookings of a User", data: bookings });
    } catch (err) {
        console.log(err);
        res.status(400).send({ msg: err.message });
    }
}
);

// get a booking
protectedRoute.get("/booking/details/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const booking = await bookingModel.findById(id);
        const flight = await flightModel.findById(booking.flightId);
        flight.createdAt = undefined;
        flight.updatedAt = undefined;
        flight.__v = undefined;
        flight._id = undefined;
        flight.flightDays = undefined;
        booking.flight_details = flight;
        res.status(200).send({ "msg": "booking details", data: booking });
    } catch (err) {
        console.log(err);
        res.status(400).send({ msg: err.message, "error": "err" });
    }
}
);

// delete a booking
protectedRoute.delete("/booking/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const booking = await bookingModel.findByIdAndDelete(id);
        res.status(200).send({ msg: "Booking Deleted Successfully!", data: booking });
    } catch (err) {
        console.log(err);
        res.status(400).send({ msg: err.message });
    }
}
);

// User Section ------------------------------------------- User Section ------------------------------------------------- User Section

// get all users
protectedRoute.get("/users/all", async (req, res) => {
    try {
        const users = await usersModel.find();
        res.status(200).send({ data: users });
    } catch (err) {
        console.log(err);
        res.status(400).send({ msg: err.message });
    }
}
);

// update a user
protectedRoute.put("/user/update/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, mobile, password } = req.body;
    try {
        const user = await usersModel.findByIdAndUpdate(id, { name, email, mobile, password });
        const updatedUser = await usersModel.findById(id);
        res.status(200).send({ msg: "User Updated Successfully!", data: updatedUser });
    } catch (err) {
        console.log(err);
        res.status(400).send({ msg: err.message });
    }
}
);

// delete a user
protectedRoute.delete("/user/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await usersModel.findByIdAndDelete(id);
        res.status(200).send({ msg: "User Deleted Successfully!", data: user });
    } catch (err) {
        console.log(err);
        res.status(400).send({ msg: err.message });
    }
}
);

// export the protectedRoute
module.exports = { protectedRoute };