const Validator = require("validator");
const isEmpty = require("./is-empty");

const validateLoginInput = data => {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Check email availability
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  } else if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const validateRegisterInput = data => {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // Check email availability
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  } else if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password is required";
  } else if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords do not match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const validateChangePasswordInput = data => {
  let errors = {};

  data.password = !isEmpty(data.password) ? data.password : "";
  data.passwordNew1 = !isEmpty(data.passwordNew1) ? data.passwordNew1 : "";
  data.passwordNew2 = !isEmpty(data.passwordNew2) ? data.passwordNew2 : "";

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  } else if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Validator.isEmpty(data.passwordNew1)) {
    errors.passwordNew1 = "New password is required";
  } else if (!Validator.isLength(data.passwordNew1, { min: 6, max: 30 })) {
    errors.passwordNew1 = "Password must be at least 6 characters";
  }

  if (Validator.isEmpty(data.passwordNew2)) {
    errors.passwordNew2 = "Confirm new password is required";
  } else if (!Validator.equals(data.passwordNew1, data.passwordNew2)) {
    errors.passwordNew2 = "Passwords do not match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const validateRequestResetInput = data => {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const validateResetPasswordInput = data => {
  let errors = {};

  data.otp = !isEmpty(data.otp) ? data.otp : "";
  data.passwordNew1 = !isEmpty(data.passwordNew1) ? data.passwordNew1 : "";
  data.passwordNew2 = !isEmpty(data.passwordNew2) ? data.passwordNew2 : "";

  if (Validator.isEmpty(data.otp)) {
    errors.otp = "OTP is required";
  } else if (!Validator.isLength(data.otp, { min: 6, max: 6 })) {
    errors.otp = "OTP must be 6 digits";
  }

  if (Validator.isEmpty(data.passwordNew1)) {
    errors.passwordNew1 = "New password is required";
  } else if (!Validator.isLength(data.passwordNew1, { min: 6, max: 30 })) {
    errors.passwordNew1 = "Password must be at least 6 characters";
  }

  if (Validator.isEmpty(data.passwordNew2)) {
    errors.passwordNew2 = "Confirm new password is required";
  } else if (!Validator.equals(data.passwordNew1, data.passwordNew2)) {
    errors.passwordNew2 = "Passwords do not match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = {
  validateLoginInput,
  validateRegisterInput,
  validateRequestResetInput,
  validateChangePasswordInput,
  validateResetPasswordInput
};
