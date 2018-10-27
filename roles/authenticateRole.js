const hierarchy = require("./roles").hierarchy;

const hasExactRole = (userRole, requiredRole) => {
  return new Promise((resolve, reject) => {
    if (hierarchy.indexOf(userRole) < 0) {
      reject({ code: 401, msg: { unauthorized: "User role does not exist" } });
    }
    if (hierarchy.indexOf(requiredRole) < 0) {
      reject({ code: 500, msg: { error: "Required role does not exist" } });
    }

    if (userRole === requiredRole) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
};

const exactRole = role => (req, res, next) => {
  hasExactRole(req.user.role, role)
    .then(result => {
      if (result) {
        next();
      } else {
        return res.status(401).json({ unauthorized: "Role not sufficient" });
      }
    })
    .catch(err => {
      return res.status(err.code).json(err.msg);
    });
};

const hasMinimumRole = (userRole, requiredRole) => {
  return new Promise((resolve, reject) => {
    const requiredRoleLevel = hierarchy.indexOf(requiredRole);
    const userRoleLevel = hierarchy.indexOf(userRole);

    if (userRoleLevel < 0) {
      reject({ code: 401, msg: { unauthorized: "User role does not exist" } });
    }
    if (requiredRoleLevel < 0) {
      reject({ code: 500, msg: { error: "Minimum role does not exist" } });
    }

    if (requiredRoleLevel >= userRoleLevel) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
};

const minimumRole = role => (req, res, next) => {
  hasMinimumRole(req.user.role, role)
    .then(result => {
      if (result) {
        next();
      } else {
        return res.status(401).json({ unauthorized: "Role not sufficient" });
      }
    })
    .catch(err => {
      return res.status(err.code).json(err.msg);
    });
};

module.exports = { minimumRole, exactRole, hasMinimumRole, hasExactRole };
