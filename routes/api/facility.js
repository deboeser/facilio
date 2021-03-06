const express = require("express");
const router = express.Router();
const passport = require("passport");
const isEmpty = require("../../validation/is-empty");

const Facility = require("../../models/Facility");
const Resource = require("../../models/Resource");
const Slot = require("../../models/Slot");
const { minimumRole } = require("../../roles/authenticateRole");
const { roles } = require("../../roles/roles");

const sortByField = require("../../utils/sortByField");

const {
  validateNewFacilityInput,
  validateModifyFacilityInput,
  validateResourceRemoveInput,
  validateResourceAddInput
} = require("../../validation/facility");

// Get all facilities
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  minimumRole(roles.USER),
  (req, res) => {
    const errors = {};

    Facility.find()
      .populate("resources", ["active", "name"])
      .sort({ name: 1 })
      .then(result => {
        if (!result) {
          errors.notfound = "No entries in database";
          return res.status(404).json(errors);
        }
        result.forEach(item => {
          item.resources.sort(sortByField("name", 1));
        });
        return res.json(result);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
);

// Get facility by ID
router.get(
  "/id/:id",
  passport.authenticate("jwt", { session: false }),
  minimumRole(roles.USER),
  (req, res) => {
    const errors = {};

    Facility.findOne({ _id: req.params.id })
      .populate("resources", ["active", "name"])
      .then(result => {
        if (!result) {
          errors.notfound = "ID not found in database";
          return res.status(404).json(errors);
        }
        result.resources.sort(sortByField("name", 1));

        // Return value that is specified in query if available
        if (!isEmpty(req.query.show)) {
          let returnResult = {};
          req.query.show.split(",").forEach(item => {
            if (!isEmpty(result[item])) {
              returnResult[item] = result[item];
            }
          });
          if (!isEmpty(returnResult)) {
            return res.json(returnResult);
          }
        }

        return res.json(result);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
);

// Check if facility with certain name exists
router.get(
  "/exists/:name(*)",
  passport.authenticate("jwt", { session: false }),
  minimumRole(roles.MANAGER),
  (req, res) => {
    const errors = {};

    Facility.findOne({ name: req.params.name })
      .then(result => {
        if (!result) {
          return res.json({ exists: false });
        }
        return res.json({ exists: true });
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
);

const createResourcesAndSlots = (resources, slots) => {
  return new Promise((resolve, reject) => {
    let resourcePromises = [];
    let slotPromises = [];

    resources.forEach(item => {
      resourcePromises.push(new Resource({ name: item }).save());
    });

    slots.forEach(item => {
      slotPromises.push(new Slot({ from: item.from, to: item.to }).save());
    });

    Promise.all(resourcePromises)
      .then(valuesRes => {
        Promise.all(slotPromises)
          .then(valuesSlt => {
            const result = {
              resourceIds: valuesRes,
              slotIds: valuesSlt
            };
            resolve(result);
          })
          .catch(err => reject(err));
      })
      .catch(err => reject(err));
  });
};

// Create a new facility
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  minimumRole(roles.MANAGER),
  (req, res) => {
    let { errors, isValid } = validateNewFacilityInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Facility.findOne({ name: req.body.name })
      .then(result => {
        if (result) {
          errors.name = "A facility with this name already exists.";
          return res.status(400).json(errors);
        }

        createResourcesAndSlots(req.body.resources, req.body.slots)
          .then(result => {
            const newFacility = {
              name: req.body.name,
              imgurl: req.body.imgurl,
              deposit: req.body.deposit,
              fee: req.body.fee,
              confirmation: req.body.confirmation,
              description: req.body.description,
              resources: result.resourceIds,
              slots: result.slotIds
            };

            new Facility(newFacility)
              .save()
              .then(result => res.json(result))
              .catch(err => res.status(500).json("Facility could not be created"));
          })
          .catch(err => res.status(500).json("Error in create slot and resources function"));
      })
      .catch(err => res.status(400).json(err));
  }
);

// Update an existing facility
router.post(
  "/update/",
  passport.authenticate("jwt", { session: false }),
  minimumRole(roles.MANAGER),
  (req, res) => {
    const { errors, isValid } = validateModifyFacilityInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const modifyFacility = {};
    const fields = ["name", "imgurl", "deposit", "fee", "confirmation"];

    fields.forEach(item => {
      if (!isEmpty(req.body[item])) modifyFacility[item] = req.body[item];
    });

    Facility.findOneAndUpdate({ _id: req.body.id }, { $set: modifyFacility }, { new: true })
      .then(result => {
        if (!result) {
          errors.notfound = "Facility with ID not found";
          return res.status(404).json(errors);
        }
        return res.json({ success: true });
      })
      .catch(err => res.status(400).json(err));
  }
);

// Delete a resource
router.delete(
  "/resource",
  passport.authenticate("jwt", { session: false }),
  minimumRole(roles.MANAGER),
  (req, res) => {
    const { errors, isValid } = validateResourceRemoveInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Facility.findOne({ _id: req.body.facilityId }).then(result => {
      const removeIndex = result.resources.indexOf(req.body.resourceId);

      if (!result) {
        errors.notfound = "Facility not found";
        return res.status(404).json(errors);
      }
      if (result.resources.length === 1) {
        errors.lastresource = "Last resource on facility cannot be deleted";
        return res.status(400).json(errors);
      }
      if (removeIndex < 0) {
        errors.notfound = "Resource ID could not be found under given facility ID";
        return res.status(404).json(errors);
      }
      // TODO: return error if bookings on this resource

      // Remove resource id from resource array in facility
      const newResourceArray = [...result.resources];
      newResourceArray.splice(removeIndex, 1);
      Facility.findOneAndUpdate(
        { _id: req.body.facilityId },
        { $set: { resources: newResourceArray } },
        { new: true }
      )
        .then(result => {
          if (!result) {
            errors.notfound = "Facility with ID not found";
            return res.status(404).json(errors);
          }
          // Remove resource from database
          Resource.findOneAndRemove({ _id: req.body.resourceId })
            .then(() => res.json({ success: true }))
            .catch(err => {
              res.status(500).json(err);
            });
        })
        .catch(err => {
          return res.status(500).json(err);
        });
    });
  }
);

// Create a new resource
router.post(
  "/resource",
  passport.authenticate("jwt", { session: false }),
  minimumRole(roles.MANAGER),
  (req, res) => {
    const { errors, isValid } = validateResourceAddInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Facility.findOne({ _id: req.body.facilityId })
      .populate("resources", ["active", "name"])
      .then(result => {
        if (!result) {
          errors.notfound = "No facility with given ID in database";
          return res.status(404).json(errors);
        }

        const currentResourceNames = result.resources.map(item => item.name);
        if (currentResourceNames.indexOf(req.body.name) >= 0) {
          errors.name = "Resource name already exists in the given facility";
          return res.status(400).json(errors);
        }

        new Resource({ name: req.body.name })
          .save()
          .then(resourceResult => {
            const newResourceArray = result.resources;
            newResourceArray.push(resourceResult._id);

            Facility.findOneAndUpdate(
              { _id: result._id },
              { $set: { resources: newResourceArray } },
              { new: true }
            )
              .then(facilityResult => {
                return res.json(facilityResult);
              })
              .catch(err => res.status(500).json(err));
          })
          .catch(err => res.status(500).json(err));
      })
      .catch(err => res.status(500).json(err));
  }
);

// Delete a facility by ID
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  minimumRole(roles.MANAGER),
  (req, res) => {
    Facility.findOne({ _id: req.params.id }).then(result => {
      if (!result) {
        return res.status(400).json({ notfound: "Facility ID not found" });
      }

      let resourcePromises = [];
      result.resources.forEach(item => {
        resourcePromises.push(Resource.findOneAndRemove({ _id: item }));
      });

      let slotPromises = [];
      result.slots.forEach(item => {
        slotPromises.push(Slot.findOneAndRemove({ _id: item }));
      });

      Promise.all(resourcePromises)
        .then(values => {
          Promise.all(slotPromises)
            .then(values => {
              Facility.findOneAndRemove({ _id: req.params.id })
                .then(() => {
                  return res.json({ success: true });
                })
                .catch(err => res.status(500).json("Could not remove facility"));
            })
            .catch(err => res.status(500).json("Could not remove all slots"));
        })
        .catch(err => res.status(500).json("Could not remove all resources"));
    });
  }
);

// TODO: De/Activate Resources and Facilities

module.exports = router;
