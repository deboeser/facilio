const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Reset = require("../../models/Reset");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const serverconfig = require("../../config/serverconfig");
const passport = require("passport");
const sendMail = require("../../utils/sendMail");

const {
  validateLoginInput,
  validateRegisterInput,
  validateRequestResetInput,
  validateChangePasswordInput,
  validateResetPasswordInput
} = require("../../validation/auth");

/**
 * @route   GET api/auth/example
 * @desc    Implements example boilerplate route
 * @access  public
 */
router.get("/example", (req, res) => res.json({ msg: req.headers.host }));

/**
 * @route   POST api/auth/register
 * @desc    Register a new user
 * @access  public
 */
router.post("/register", (req, res) => {
  // Check Validation of register fields

  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password
      });

      // Password encryption with salt
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json({ email: user.email, roles: user.roles }))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

/**
 * @route   POST api/auth/login
 * @desc    Login to an account
 * @access  public
 */
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          email: user.email
        };
        jwt.sign(
          payload,
          keys.secret,
          { expiresIn: serverconfig.loginExpiry },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

/**
 * @route   POST api/auth/current
 * @desc    Return the current user
 * @access  private
 */
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      email: req.user.email
    });
  }
);

/**
 * @route   POST api/auth/change-password
 * @desc    Changes the password of the user
 * @access  private
 */
router.post(
  "/change-password",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateChangePasswordInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    bcrypt.compare(req.body.password, req.user.password).then(isMatch => {
      if (!isMatch) {
        errors.password = "Password incorrect";
        return res.status(401).json(errors);
      } else {
        const newUserData = {
          password: req.body.passwordNew1
        };

        // Password encryption with salt
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUserData.password, salt, (err, hash) => {
            if (err) throw err;
            newUserData.password = hash;

            User.findOneAndUpdate(
              { email: req.user.email },
              { $set: newUserData },
              { new: true }
            )
              .then(usr => res.json({ success: true }))
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
);

/**
 * @route   POST api/auth/reset-password
 * @desc    Creates reset password entry that expires after 10 minutes or three failed attempts
 * @access  public
 */
router.post("/reset-password", (req, res) => {
  const { errors, isValid } = validateRequestResetInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      errors.email = "No user with this email";
      return res.status(404).json(errors);
    } else {
      Reset.findOne({ user: user._id }).then(reset => {
        if (reset) {
          Reset.findOneAndRemove({ user: user._id })
            .then(() => {})
            .catch(err => res.status(500).json(err));
        }

        const newReset = {
          user: user._id,
          otp: String(Math.floor(100000 + Math.random() * 900000))
        };
        new Reset(newReset)
          .save()
          .then(reset => {
            const mailOptions = {
              from: "Corvin from onverio <noreply@deboeser.de>",
              to: user.email,
              subject: "Reset password for onverio.me",
              text: `http://${req.headers["x-forwarded-host"]}/reset-password/${
                reset.token
              } with your OTP: ${reset.otp}`,
              html: `<h1>Reset Link</h1><a href='http://${
                req.headers["x-forwarded-host"]
              }/reset-password/${
                reset.token
              }'>Click here to reset your password</a><p>Your OTP: ${
                reset.otp
              }</p>`
            };
            sendMail(mailOptions)
              .then(success => {
                return res.json(success);
              })
              .catch(err => {
                console.log(err);
                return res.status(500).json({ success: false });
              });
          })
          .catch(err => res.status(400).json(err));
      });
    }
  });
});

/**
 * @route   POST api/auth/reset-password/is-valid/:token
 * @desc    Checks if a reset link with the given token is existing and valid
 * @access  public
 */
router.get("/reset-password/is-valid/:token", (req, res) => {
  const errors = {};

  Reset.findOne({ token: req.params.token }).then(reset => {
    if (!reset) {
      // Case no otp with given token
      errors.invalid = "Not a valid reset link";
      return res.status(404).json(errors);
    } else {
      if (reset.exp < Date.now()) {
        // Case reset expired
        errors.invalid = "Reset link expired";
        Reset.findOneAndRemove({ _id: reset._id })
          .then(() => res.status(401).json(errors))
          .catch(err => res.status(500).json(err));
      } else {
        return res.json({
          validUntil: reset.exp
        });
      }
    }
  });
});

/**
 * @route   POST api/auth/reset-password/:token
 * @desc    Resets the password for a reset entry with id :token
 * @access  public
 */
router.post("/reset-password/:token", (req, res) => {
  const { errors, isValid } = validateResetPasswordInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Reset.findOne({ token: req.params.token }).then(reset => {
    if (!reset) {
      // Case no otp with given token
      errors.invalid = "Not a valid reset link";
      return res.status(404).json(errors);
    } else {
      if (reset.exp < Date.now()) {
        // Case reset expired
        errors.invalid = "Reset link expired";
        Reset.findOneAndRemove({ _id: reset._id })
          .then(obj => res.status(401).json(errors))
          .catch(err => res.status(500).json(err));
      } else if (!(reset.otp === String(req.body.otp))) {
        // Case otp wrong
        if (reset.remainingAttempts === 1) {
          // Case attempts used up
          errors.invalid = "Too many failed attempts";
          Reset.findOneAndRemove({ _id: reset._id })
            .then(obj => res.status(401).json(errors))
            .catch(err => res.status(500).json(err));
        } else {
          const updateReset = {
            remainingAttempts: reset.remainingAttempts - 1
          };

          Reset.findOneAndUpdate(
            { _id: reset._id },
            { $set: updateReset },
            { new: true }
          )
            .then(reset => {})
            .catch(err => console.log(err));

          errors.otp = "OTP is incorrect";
          errors.remaining = updateReset.remainingAttempts;
          return res.status(401).json(errors);
        }
      } else if (reset.otp === String(req.body.otp)) {
        // Case reset password
        Reset.findOneAndRemove({ _id: reset._id })
          .then(() => {})
          .catch(err => res.status(500).json(err));

        const newUserData = {
          password: req.body.passwordNew1
        };

        // Password encryption with salt
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUserData.password, salt, (err, hash) => {
            if (err) throw err;
            newUserData.password = hash;

            User.findOneAndUpdate(
              { _id: reset.user },
              { $set: newUserData },
              { new: true }
            )
              .then(usr => res.json({ success: true }))
              .catch(err => console.log(err));
          });
        });
      }
    }
  });
});

module.exports = router;
