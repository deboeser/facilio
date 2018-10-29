const Validator = require("validator");
const isEmpty = require("./is-empty");

const validateNewFacilityInput = data => {
  let errors = {};
  let parsed = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.imgurl = !isEmpty(data.imgurl) ? data.imgurl : "";
  data.deposit = !isEmpty(data.deposit) ? data.deposit : "";
  data.price = !isEmpty(data.price) ? data.price : "";
  data.confirmation = !isEmpty(data.confirmation) ? data.confirmation : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  } else if (!Validator.isLength(data.name, { min: 3, max: 30 })) {
    errors.name = "Name must be between 3 and 30 characters";
  }

  if (!Validator.isEmpty(data.imgurl) && !Validator.isURL(data.imgurl)) {
    errors.imgurl = "Image URL is not a valid URL";
  }

  parsed.depositNumeric = Number(data.deposit);
  parsed.priceNumeric = Number(data.price);

  if (Validator.isEmpty(data.deposit)) {
    errors.deposit = "Deposit field is required";
  } else if (isNaN(parsed.depositNumeric)) {
    errors.deposit = "Deposit must be a numeric value";
  } else if (parsed.depositNumeric < 0) {
    errors.deposit = "Deposit cannot be negative";
  }

  if (Validator.isEmpty(data.price)) {
    errors.price = "Price field is required";
  } else if (isNaN(parsed.priceNumeric)) {
    errors.price = "Price must be a numeric value";
  } else if (parsed.priceNumeric < 0) {
    errors.price = "Price cannot be negative";
  }

  parsed.confirmation = data.confirmation === "true";

  if (Validator.isEmpty(data.confirmation)) {
    errors.confirmation = "Confirmation field is required";
  } else if (data.confirmation !== "true" && data.confirmation !== "false") {
    errors.confirmation = "Confirmation must be true or false";
  }

  return {
    errors,
    isValid: isEmpty(errors),
    parsed
  };
};

const validateModifyFacilityInput = data => {
  let errors = {};
  let parsed = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.imgurl = !isEmpty(data.imgurl) ? data.imgurl : "";
  data.deposit = !isEmpty(data.deposit) ? data.deposit : "";
  data.price = !isEmpty(data.price) ? data.price : "";
  data.confirmation = !isEmpty(data.confirmation) ? data.confirmation : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  if (
    isEmpty(data.name) &&
    isEmpty(data.imgurl) &&
    isEmpty(data.deposit) &&
    isEmpty(data.price) &&
    isEmpty(data.confirmation) &&
    isEmpty(data.description)
  ) {
    errors.nochange = "At least one filed must be changed.";
  }

  parsed.depositNumeric = Number(data.deposit);
  parsed.priceNumeric = Number(data.price);

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
    if (isNaN(parsed.depositNumeric)) {
      errors.deposit = "Deposit must be a numeric value";
    } else if (parsed.depositNumeric < 0) {
      errors.deposit = "Deposit cannot be negative";
    }
  }

  if (!Validator.isEmpty(data.price)) {
    if (isNaN(parsed.priceNumeric)) {
      errors.price = "Price must be a numeric value";
    } else if (parsed.priceNumeric < 0) {
      errors.price = "Price cannot be negative";
    }
  }

  parsed.confirmation = data.confirmation === "true";

  if (!Validator.isEmpty(data.confirmation)) {
    if (data.confirmation !== "true" && data.confirmation !== "false") {
      errors.confirmation = "Confirmation must be true or false";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
    parsed
  };
};

const validateResourceInput = data => {
  let errors = {};
  let resources;

  if (isEmpty(data)) {
    errors.resources = "At least one resource is required";
  } else {
    resources = data.split(",");

    resources.forEach(item => {
      if (!Validator.isLength(item, { min: 3, max: 30 })) {
        errors.resources = "Resource names must be between 3 and 30 characters";
      }
    });

    if (new Set(resources).size !== resources.length) {
      errors.resources = "Resources must have different names";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
    resources: resources
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
  validateResourceInput,
  validateResourceRemoveInput,
  validateResourceAddInput
};
