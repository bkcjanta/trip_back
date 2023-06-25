const mongoose = require('mongoose');
// create a schema for flights bookings by users

const bookingSchema = mongoose.Schema({
    flightId: { type: mongoose.Schema.Types.ObjectId, ref: "trips", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    seats: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    bookingDate: { type: Date, default: Date.now },
    bookingStatus: { type: String, default: "active" },
    pasengers: { type: Array, required: true },
}, { timestamps: true });

// create a model for flights bookings by users
const bookingModel = mongoose.model('booking', bookingSchema);

module.exports = { bookingModel };
