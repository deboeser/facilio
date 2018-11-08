const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  facility: {
    type: Schema.Types.ObjectId,
    ref: "facilities",
    required: true
  },
  resource: {
    type: Schema.Types.ObjectId,
    ref: "resources",
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  timeslots: [
    {
      type: Schema.Types.ObjectId,
      ref: "slots"
    }
  ],
  created: {
    type: Date,
    default: Date.now
  },
  cancelled: {
    type: Boolean,
    default: false
  },
  depositPaid: {
    type: Boolean,
    default: false
  },
  feePaid: {
    type: Boolean,
    default: false
  },
  confirmed: {
    type: Boolean,
    default: false
  },
  cancelledBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: false
  },
  depositConfirmedBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: false
  },
  feeConfirmedBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: false
  },
  bookingConfirmedBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: false
  }
});

module.exports = Booking = mongoose.model("bookings", bookingSchema);
