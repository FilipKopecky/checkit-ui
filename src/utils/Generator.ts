import {
  Change,
  ChangeState,
  ChangeType,
  ObjectData,
  SubjectType,
} from "../model/Change";

export const generateCurrentAdminUser = () => {
  return {
    firstName: "Admin",
    id: "35348b19-aaa4-481d-b424-5de3c27d0d5b",
    lastName: "LastName",
    roles: ["ROLE_USER", "ROLE_ADMIN"],
    status: "idle",
    isAdmin: true,
    loggedIn: true,
  };
};
export const generateCurrentUser = () => {
  return {
    firstName: "User",
    id: "35348b19-aaa4-481d-b424-5de3c27d0d5b",
    lastName: "LastName",
    roles: ["ROLE_USER"],
    status: "idle",
    isAdmin: false,
    loggedIn: true,
  };
};

export const generateObjectData = (language?: string): ObjectData => {
  return { languageTag: language, value: "text value" };
};

export const generateId = () => {
  return `instance -${Math.random() * 100000}`;
};
export const generateChangeUri = (id: string) => {
  return `https://slovník.gov.cz/datový/popis-zmen/pojem/změna/${id}`;
};

export const generateChange = (
  state: ChangeState = "NOT_REVIEWED",
  type: ChangeType = "CREATED",
  subjectType: SubjectType = "VOCABULARY",
  gestored = true,
  readOnly = false
): Change => {
  const id = generateId();
  return {
    publicationId: "",
    vocabularyUri: "",
    id: id,
    uri: generateChangeUri(id),
    type: type,
    subject: "https://slovník.gov.cz/generický/slovník",
    subjectType: subjectType,
    predicate:
      "http://onto.fel.cvut.cz/ontologies/slovník/agendový/popis-dat/pojem/má-glosář",
    object: generateObjectData(),
    comments: [],
    state: state,
    label: "enclosing label",
    gestored: gestored,
    publicationDate: new Date(Date.now()),
    numberOfComments: 0,
    readOnly: readOnly,
  };
};
