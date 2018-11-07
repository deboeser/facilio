const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

// Importing routes
const auth = require("./routes/api/auth");
const facility = require("./routes/api/facility");
const booking = require("./routes/api/booking");

// Init Server, bodyParser, connect to MongoDB
const app = express();
const port = process.env.PORT || 5000;
const db = require("./config/keys").mongoURI;

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Body parser and passport middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
require("./config/passport")(passport);

// Defining routes
app.get("/", (req, res) => res.send("Hello"));
app.use("/api/auth", auth);
app.use("/api/facility", facility);
app.use("/api/booking", booking);

// Starting server listening
app.listen(port, () => console.log(`Server running on port ${port}`));
