const express = require("express");
const bookingRoute = express.Router();
const { bookingModel } = require("../models/booking.model");
const { flightModel } = require("../models/flight.model");




// post a booking
bookingRoute.post("/add", async (req, res) => {
    const { flightId, userId, passengers, totalPrice } = req.body;
    const seats = passengers.length;
    try {
        const newBooking = new bookingModel({ flightId, seats, userId, passengers, totalPrice });
        const booking = await newBooking.save();
        res.status(200).send({ msg: "New Booking Created Successfully!", data: booking });
    } catch (err) {
        console.log(err);
        res.status(400).send({ msg: err.message });
    }
}
);

// get a booking
bookingRoute.get("/details/:id", async (req, res) => {
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

// update a booking
bookingRoute.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { flightId, userId, seats, passengers, totalPrice, bookingStatus } = req.body;
    try {
        const booking = await bookingModel.updateOne({ _id: id, userId }, { flightId, userId, seats, passengers, totalPrice, bookingStatus });
        const updatedBooking = await bookingModel.findById(id);
        res.status(200).send({ msg: "Booking Updated Successfully!", data: updatedBooking });
    } catch (err) {
        console.log(err);
        res.status(400).send({ msg: err.message });
    }
}
);


// get all bookings of a user
bookingRoute.get("/user/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const bookings = await bookingModel.find({ userId: id });
        // map the bookings array to get flight details
        const bookingsWithFlightDetails = await Promise.all(bookings.map(async (booking) => {
            const flight = await flightModel.findById(booking.flightId);
            flight.createdAt = undefined;
            flight.updatedAt = undefined;
            flight.__v = undefined;
            flight._id = undefined;
            flight.flightDays = undefined;
            booking.flight_details = flight;
            booking.createdAt = undefined;
            booking.updatedAt = undefined;
            booking.__v = undefined;
            return booking;
        }));
        res.status(200).send({ msg: "Bookings of a User", data: bookingsWithFlightDetails });
    } catch (err) {
        console.log(err);
        res.status(400).send({ msg: err.message });
    }
}
);



module.exports = { bookingRoute };
