const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const slotSchema = new Schema({
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  }
});

module.exports = Slot = mongoose.model("slots", slotSchema);
