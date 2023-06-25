const express = require("express");
const flightRoute = express.Router();
const { flightModel } = require("../models/flight.model");
const date = require('date-and-time');

// search flights basing on from and to, departure date and return date,
flightRoute.post("/search", async (req, res) => {
    const { from, to, departureDate, returnDate } = req.body;
    console.log("req.body", req.body);
    console.log("departureDate", departureDate);
    const day = date.format(new Date(departureDate), 'dddd');
    console.log("day", day);

    // Create a query object to search flights basing on from and to, flightdays where flightdays is an array which contains the days
    // on which the flight is available
    const query = {
        $and: [
            { from: from },
            { to: to },
            { flightDays: { $in: [day] } }
        ]
    }

    console.log("query", query.$and[2].flightDays.$in[0]);

    try {
        const trips = await flightModel.find(query);
        console.log("trips", trips);
        res.status(200).send({ data: trips });
    } catch (err) {
        console.log(err);
        res.status(400).send({ msg: err.message });
    }
}
)




// get a flight details
flightRoute.get("/details/:id", async (req, res) => {
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





module.exports = { flightRoute };
