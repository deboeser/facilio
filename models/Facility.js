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
    default: 0
  },
  price: {
    type: Number,
    default: 0
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
  // bookingFrom: {
  //   type: Number,
  //   required: true
  // },
  // bookingTo: {
  //   type: Number,
  //   required: true
  // },
  // slotOrInterval: {
  //   type: Boolean,
  //   required: true
  // },
  // bookingMax: {
  //   type: Number
  // },
  // interval: {
  //   type: Number
  // },
  // slots: [
  //   {
  //     from: {
  //       type: Number
  //     },
  //     to: {
  //       type: Number
  //     }
  //   }
  // ],
  resources: [
    {
      type: Schema.Types.ObjectId,
      ref: "resources"
    }
  ]
});

module.exports = Facility = mongoose.model("facilities", facilitySchema);
