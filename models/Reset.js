const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const generateToken = require("../utils/generateToken");
const { tokenLength, resetExpiry } = require("../config/serverconfig");

const resetSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  date: {
    type: Date,
    default: Date.now
  },
  token: {
    type: String,
    default: () => generateToken(tokenLength)
  },
  exp: {
    type: Date,
    default: () => Date.now() + resetExpiry * 1000
  },
  otp: {
    type: String,
    required: true
  },
  remainingAttempts: {
    type: Number,
    default: 3
  }
});

module.exports = User = mongoose.model("resets", resetSchema);
