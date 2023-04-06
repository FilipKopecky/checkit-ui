import { ObjectData } from "../model/Change";

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
