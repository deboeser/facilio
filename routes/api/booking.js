const express = require("express");
const router = express.Router();
const passport = require("passport");
const isEmpty = require("../../validation/is-empty");

const Booking = require("../../models/Booking");
const { minimumRole } = require("../../roles/authenticateRole");
const { roles } = require("../../roles/roles");

const {
  validateNewBookingInput,
  validateBookingStatusUpdate
} = require("../../validation/booking");

// Get all bookings
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  minimumRole(roles.MANAGER),
  (req, res) => {
    const errors = {};

    Booking.find()
      .populate("user", ["email"])
      .populate("cancelledBy", ["email"])
      .populate("depositConfirmedBy", ["email"])
      .populate("feeConfirmedBy", ["email"])
      .populate("bookingConfirmedBy", ["email"])
      .populate("facility", ["name"])
      .populate("resource", ["name"])
      .populate("timeslots", ["from", "to"])
      .sort({ date: 1 })
      .then(result => {
        if (!result) {
          errors.notfound = "No entries in database";
          return res.status(404).json(errors);
        }
        return res.json(result);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
);

// Get my bookings
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  minimumRole(roles.USER),
  (req, res) => {
    const errors = {};

    Booking.find({ user: req.user.id })
      .populate("user", ["email"])
      .populate("facility", ["name"])
      .populate("resource", ["name"])
      .populate("timeslots", ["from", "to"])
      .sort({ date: 1 })
      .then(result => {
        if (!result) {
          errors.notfound = "No entries in database";
          return res.status(404).json(errors);
        }
        return res.json(result);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
);

// Create new booking
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  minimumRole(roles.USER),
  (req, res) => {
    const { errors, isValid } = validateNewBookingInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newBooking = {
      user: req.user.id,
      facility: req.body.facility,
      resource: req.body.resource,
      date: req.body.date,
      timeslots: req.body.timeslots
    };

    new Booking(newBooking)
      .save()
      .then(result => res.json(result))
      .catch(err => res.status(500).json(err.response.data));
  }
);

// Update booking status
router.post(
  "/update",
  passport.authenticate("jwt", { session: false }),
  minimumRole(roles.MANAGER),
  (req, res) => {
    const { errors, isValid } = validateBookingStatusUpdate(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    let update = {};

    switch (req.body.action) {
      case "cancel":
        update.cancelled = true;
        update.cancelledBy = req.user.id;
        break;
      case "confirmDeposit":
        update.depositPaid = true;
        update.depositConfirmedBy = req.user.id;
        break;
      case "confirmFee":
        update.feePaid = true;
        update.feeConfirmedBy = req.user.id;
        break;
      case "confirmBooking":
        update.confirmed = true;
        update.bookingConfirmedBy = req.user.id;
        break;
    }

    Booking.findOneAndUpdate({ _id: req.body.id }, { $set: update }, { new: true })
      .then(result => {
        if (!result) {
          errors.notfound = "Booking with this ID not found";
          return res.status(404).json(errors);
        }
        return res.json({ success: true });
      })
      .catch(err => {
        console.log(err.response.data);
        return res.status(500).json({ error: "Internal Server Error" });
      });
  }
);

module.exports = router;
