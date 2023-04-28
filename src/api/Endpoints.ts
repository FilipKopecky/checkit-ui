import { ChangeState } from "../model/Change";

const endpoints = {
  CURRENT_USER: "users/current",
  GET_ALL_USERS: "admin-management/users",
  GET_ADMIN_PANEL_SUMMARY: "admin-management/summary",
  GET_ALL_VOCABULARIES: "/vocabularies",
  GET_MY_GESTORED_VOCABULARIES: "/vocabularies/my-gestored",
  GET_ALL_GESTOR_REQUESTS: "gestoring-requests",
  GET_MY_GESTORING_REQUESTS: "gestoring-requests/my-requests",
  GET_PUBLICATION_CONTEXT: "publication-contexts",
  GET_ALL_REVIEWABLE_PUBLICATIONS: "publication-contexts/reviewable",
  GET_ALL_READONLY_PUBLICATIONS: "publication-contexts/readonly",
  CHANGES: "changes",
  CHANGES_REVIEW: "changes/review",
  COMMENTS: "comments",
  CHANGE_COMMENTS: "comments/discussion-on-change",
  REJECT_COMMENT_CHANGE: "comments/rejection-on-change",
  NOTIFICATIONS: "notifications",
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
  return `${endpoints.GET_PUBLICATION_CONTEXT}/${id}`;
};

export const getPublicationStateResolve = (id: string, state: string) => {
  return `${endpoints.GET_PUBLICATION_CONTEXT}/${id}/${state}`;
};

export const getPublicationVocabularyChanges = (publicationId: string) => {
  return `${getPublication(publicationId)}/vocabulary-changes`;
};

export const getClearReview = (changeId: string) => {
  return `${endpoints.CHANGES}/${changeId}/review`;
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

export const getRestrictionChangeResolve = (state: ChangeState) => {
  let stateToText;
  switch (state) {
    case "APPROVED":
      stateToText = "approved";
      break;
    case "REJECTED":
      stateToText = "rejected";
      break;
  }
  return `${endpoints.CHANGES}/${stateToText}`;
};
export default endpoints;
