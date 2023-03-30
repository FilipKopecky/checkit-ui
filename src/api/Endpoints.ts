import { ChangeState } from "../model/Change";

const endpoints = {
  CURRENT_USER: "users/current",
  GET_ALL_USERS: "admin-management/users",
  GET_ADMIN_PANEL_SUMMARY: "admin-management/summary",
  GET_ALL_VOCABULARIES: "/vocabularies",
  GET_MY_GESTORED_VOCABULARIES: "/vocabularies/my-gestored",
  GET_ALL_GESTOR_REQUESTS: "gestoring-requests",
  GET_MY_GESTORING_REQUESTS: "gestoring-requests/my-requests",
  GET_ALL_RELEVANT_PUBLICATIONS: "publication-contexts",
  CHANGES: "changes",
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

export const getPublicationVocabularyChanges = (publicationId: string) => {
  return `${getPublication(publicationId)}/vocabulary-changes`;
};

export const getChangeResolve = (changeId: string, state: ChangeState) => {
  let stateToText;
  switch (state) {
    case "APPROVED":
      stateToText = "approved";
      break;
    case "REJECTED":
      stateToText = "rejected";
      break;
  }
  return `${endpoints.CHANGES}/${changeId}/${stateToText}`;
};
export default endpoints;
