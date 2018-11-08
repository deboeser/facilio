const Validator = require("validator");
const isEmpty = require("./is-empty");
const mongoose = require("mongoose");
const ObjectIdValid = mongoose.Types.ObjectId.isValid;

const validateNewBookingInput = data => {
  let errors = {};

  // TODO: Check if booking in the past

  if (isEmpty(data.facility)) {
    errors.facility = "Facility is required";
  } else if (!ObjectIdValid(data.facility)) {
    errors.facility = "Not a valid facility ID";
  }

  if (isEmpty(data.resource)) {
    errors.resource = "Resource is required";
  } else if (!ObjectIdValid(data.resource)) {
    errors.resource = "Not a valid resource ID";
  }

  if (isEmpty(data.timeslots)) {
    errors.timeslots = "At least one timeslot is required";
  } else if (!Array.isArray(data.timeslots)) {
    errors.timeslots = "Timeslots must be an array of timeslot IDs";
  } else {
    data.timeslots.forEach(item => {
      if (!ObjectIdValid(item)) {
        errors.timeslots = "At least one timeslot IDs not valid";
      }
    });
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const validateBookingStatusUpdate = data => {
  let errors = {};

  data.id = !isEmpty(data.id) ? data.id : "";
  data.action = !isEmpty(data.action) ? data.action : "";

  const actions = ["cancel", "confirmDeposit", "confirmFee", "confirmBooking"];

  if (Validator.isEmpty(data.id)) {
    errors.id = "Booking ID is required";
  } else if (!ObjectIdValid(data.id)) {
    errors.id = "Not a valid booking ID";
  }

  if (Validator.isEmpty(data.action)) {
    errors.action = "Update action is required";
  } else if (actions.indexOf(data.action) < 0) {
    errors.action = "Not a valid update action";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = {
  validateNewBookingInput,
  validateBookingStatusUpdate
};
