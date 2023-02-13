import { User } from "oidc-client-ts";
import { getOidcIdentityStorageKey } from "./config";

/**
 * Return access token of the currently logged-in user.
 * To be used as an Authorization header content for API fetch calls.
 */
export const getToken = (): string => {
  const identityData = sessionStorage.getItem(getOidcIdentityStorageKey());
  const identity = identityData
    ? JSON.parse(identityData)
    : (null as User | null);
  return `${identity?.token_type} ${identity?.access_token}`;
};
