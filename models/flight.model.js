const mongoose = require('mongoose');
// create a schema for flights collection

const flightSchema = mongoose.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    seats: { type: Number },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    stops: { type: Number, default: 0 },
    airline: { type: String, required: true },
    image: { type: String, default: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" },
    description: { type: String, required: true },
    flightDays: { type: Array, required: true },
    flightStatus: { type: String, default: "active" },
}, { timestamps: true });

// create a model for flights collection
const flightModel = mongoose.model('flight', flightSchema);

module.exports = { flightModel };

