// TODO: Find better solution to not duplicate role code in backend and frontend

import { hierarchy } from "./roles";

const hasExactRole = (userRole, requiredRole) => {
  return new Promise((resolve, reject) => {
    if (hierarchy.indexOf(userRole) < 0) {
      console.log("User role does not exist");
      reject(false);
    }
    if (hierarchy.indexOf(requiredRole) < 0) {
      console.log("Required role does not exist");
      reject(false);
    }

    resolve(userRole === requiredRole);
  });
};

const hasMinimumRole = (userRole, requiredRole) => {
  return new Promise((resolve, reject) => {
    const requiredRoleLevel = hierarchy.indexOf(requiredRole);
    const userRoleLevel = hierarchy.indexOf(userRole);

    if (userRoleLevel < 0) {
      console.log("User role does not exist");
      reject(false);
    }
    if (requiredRoleLevel < 0) {
      console.log("Minimum role does not ex st");
      reject(false);
    }

    resolve(requiredRoleLevel >= userRoleLevel);
  });
};

export { hasMinimumRole, hasExactRole };
