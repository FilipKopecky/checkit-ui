const endpoints = {
  CURRENT_USER: "users/current",
  GET_ALL_USERS: "admin-management/users",
};

export const getAdminRoleSwitch = (id: string) => {
  return `${endpoints.GET_ALL_USERS}/${id}/admin-role`;
};
export default endpoints;
