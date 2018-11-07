const Validator = require("validator");
const isEmpty = require("./is-empty");

const validateNewFacilityInput = data => {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.imgurl = !isEmpty(data.imgurl) ? data.imgurl : "";
  data.deposit = !isEmpty(data.deposit) ? data.deposit : "";
  data.fee = !isEmpty(data.fee) ? data.fee : "";
  data.confirmation = !isEmpty(data.confirmation) ? data.confirmation : "";

  // Validating the resources
  if (isEmpty(data.resources)) {
    errors.resources = "At least one resource is required";
  } else {
    data.resources.forEach(item => {
      if (!Validator.isLength(item, { min: 3, max: 30 })) {
        errors.resources = "Resource names must be between 3 and 30 characters";
      }
    });

    if (new Set(data.resources).size !== data.resources.length) {
      errors.resources = "Resources must have different names";
    }
  }

  // Validating the slots
  if (isEmpty(data.slots)) {
    errors.slots = "At least one slot required";
  } else {
    data.slots.forEach(item => {
      if (isEmpty(item.from)) {
        errors.slotsFrom = "Each slots requires a from field";
      }
      if (isEmpty(item.to)) {
        errors.slotsTo = "Each slots requires a to field";
      }
    });
    // TODO: Validation of slot times are valid and if they overlap
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  } else if (!Validator.isLength(data.name, { min: 3, max: 30 })) {
    errors.name = "Name must be between 3 and 30 characters";
  }

  if (!Validator.isEmpty(data.imgurl) && !Validator.isURL(data.imgurl)) {
    errors.imgurl = "Image URL is not a valid URL";
  }

  if (isEmpty(data.deposit)) {
    errors.deposit = "Deposit field is required";
  } else if (typeof data.deposit !== "number") {
    errors.deposit = "Deposit must be a numeric value";
  } else if (data.deposit < 0) {
    errors.deposit = "Deposit cannot be negative";
  }

  if (isEmpty(data.fee)) {
    errors.fee = "Fee field is required";
  } else if (typeof data.fee !== "number") {
    errors.fee = "Fee must be a numeric value";
  } else if (data.fee < 0) {
    errors.fee = "Fee cannot be negative";
  }

  if (Validator.isEmpty(String(data.confirmation))) {
    errors.confirmation = "Confirmation field is required";
  } else if (typeof data.confirmation !== "boolean") {
    errors.confirmation = "Confirmation must be of type boolean";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const validateModifyFacilityInput = data => {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.imgurl = !isEmpty(data.imgurl) ? data.imgurl : "";
  data.deposit = !isEmpty(data.deposit) ? data.deposit : "";
  data.fee = !isEmpty(data.fee) ? data.fee : "";
  data.confirmation = !isEmpty(data.confirmation) ? data.confirmation : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  if (
    isEmpty(data.name) &&
    isEmpty(data.imgurl) &&
    isEmpty(data.deposit) &&
    isEmpty(data.fee) &&
    isEmpty(data.confirmation) &&
    isEmpty(data.description)
  ) {
    errors.nochange = "At least one filed must be changed.";
  }

  if (Validator.isEmpty(data.id)) {
    errors.id = "Facility ID is required";
  }

  if (
    !Validator.isEmpty(data.name) &&
    !Validator.isLength(data.name, { min: 3, max: 30 })
  ) {
    errors.name = "Name must be between 3 and 30 characters";
  }

  if (!Validator.isEmpty(data.imgurl) && !Validator.isURL(data.imgurl)) {
    errors.imgurl = "Image URL is not a valid URL";
  }

  if (!Validator.isEmpty(data.deposit)) {
    if (typeof data.deposit !== "number") {
      errors.deposit = "Deposit must be a numeric value";
    } else if (data.deposit < 0) {
      errors.deposit = "Deposit cannot be negative";
    }
  }

  if (!Validator.isEmpty(data.fee)) {
    if (typeof data.fee !== "number") {
      errors.fee = "Fee must be a numeric value";
    } else if (data.fee < 0) {
      errors.fee = "Fee cannot be negative";
    }
  }

  if (!Validator.isEmpty(String(data.confirmation))) {
    if (typeof data.confirmation !== "boolean") {
      errors.confirmation = "Confirmation must be of type boolean";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const validateResourceRemoveInput = data => {
  let errors = {};

  data.facilityId = !isEmpty(data.facilityId) ? data.facilityId : "";
  data.resourceId = !isEmpty(data.resourceId) ? data.resourceId : "";

  if (Validator.isEmpty(data.facilityId)) {
    errors.facilityId = "Facility ID is required";
  }

  if (Validator.isEmpty(data.resourceId)) {
    errors.resourceId = "Resource ID is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const validateResourceAddInput = data => {
  let errors = {};

  data.facilityId = !isEmpty(data.facilityId) ? data.facilityId : "";
  data.name = !isEmpty(data.name) ? data.name : "";

  if (Validator.isEmpty(data.facilityId)) {
    errors.facilityId = "Facility ID is required";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Resource name is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = {
  validateNewFacilityInput,
  validateModifyFacilityInput,
  validateResourceRemoveInput,
  validateResourceAddInput
};
