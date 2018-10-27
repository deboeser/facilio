// TODO: Find better solution to not duplicate role code in backend and frontend

const roleDefinition = [
  {
    key: "ADMIN",
    name: "Admin"
  }, // Account for facilio devs
  {
    key: "MANAGER",
    name: "Management Office"
  }, // Account type for management office
  {
    key: "USER",
    name: "Confirmed Resident"
  }, // For condo residents that are confirmed by the management
  {
    key: "NOROLE",
    name: "Confirmation Pending"
  } // For newly registered users that are not confirmed yet
];

const hierarchy = roleDefinition.map(item => item.key);

let roles = {};
roleDefinition.forEach(item => (roles[item.key] = item.key));

export { roleDefinition, hierarchy, roles };
