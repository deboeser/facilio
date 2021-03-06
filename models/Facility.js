const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const facilitySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  imgurl: {
    type: String
  },
  deposit: {
    type: Number,
    required: true
  },
  fee: {
    type: Number,
    required: true
  },
  confirmation: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true
  },
  description: {
    type: String
  },
  slotOrInterval: {
    type: Boolean,
    default: true
  },
  slots: [
    {
      from: {
        type: String,
        required: true
      },
      to: {
        type: String,
        required: true
      }
    }
  ],
  // bookingFrom: {
  //   type: Number,
  //   required: true
  // },
  // bookingTo: {
  //   type: Number,
  //   required: true
  // },
  // bookingMax: {
  //   type: Number
  // },
  // interval: {
  //   type: Number
  // },
  resources: [
    {
      type: Schema.Types.ObjectId,
      ref: "resources"
    }
  ]
});

module.exports = Facility = mongoose.model("facilities", facilitySchema);
