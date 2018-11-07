const express = require("express");
const router = express.Router();
const passport = require("passport");
const isEmpty = require("../../validation/is-empty");

const Booking = require("../../models/Booking");
const { minimumRole } = require("../../roles/authenticateRole");
const { roles } = require("../../roles/roles");

// Get all bookings
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  minimumRole(roles.MANAGER),
  (req, res) => {
    const errors = {};

    Booking.find()
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

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  minimumRole(roles.USER),
  (req, res) => {
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

module.exports = router;
