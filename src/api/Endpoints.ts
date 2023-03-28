const endpoints = {
  CURRENT_USER: "users/current",
  GET_ALL_USERS: "admin-management/users",
  GET_ADMIN_PANEL_SUMMARY: "admin-management/summary",
  GET_ALL_VOCABULARIES: "/vocabularies",
  GET_MY_GESTORED_VOCABULARIES: "/vocabularies/my-gestored",
  GET_ALL_GESTOR_REQUESTS: "gestoring-requests",
  GET_MY_GESTORING_REQUESTS: "gestoring-requests/my-requests",
  GET_ALL_RELEVANT_PUBLICATIONS: "publication-contexts",
};

export const getAdminRoleSwitch = (id: string) => {
  return `${endpoints.GET_ALL_USERS}/${id}/admin-role`;
};

export const getVocabularyGestorAssign = (id: string) => {
  return `${endpoints.GET_ALL_USERS}/${id}/gestored-vocabulary`;
};

export const getGestorRequestResolve = (id: string) => {
  return `${endpoints.GET_ALL_GESTOR_REQUESTS}/${id}/approved`;
};

export const getPublication = (id: string) => {
  return `${endpoints.GET_ALL_RELEVANT_PUBLICATIONS}/${id}`;
};
export default endpoints;
