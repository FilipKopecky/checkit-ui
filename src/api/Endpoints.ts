const endpoints = {
  CURRENT_USER: "users/current",
  GET_ALL_USERS: "admin-management/users",
  GET_ADMIN_PANEL_SUMMARY: "admin-management/summary",
  GET_ALL_VOCABULARIES: "/vocabularies",
  GET_ALL_GESTOR_REQUESTS: "gestoring-requests",
};

export const getAdminRoleSwitch = (id: string) => {
  return `${endpoints.GET_ALL_USERS}/${id}/admin-role`;
};

export const getVocabularyGestorAssign = (id: string) => {
  return `${endpoints.GET_ALL_USERS}/${id}/gestored-vocabulary`;
};
export default endpoints;
