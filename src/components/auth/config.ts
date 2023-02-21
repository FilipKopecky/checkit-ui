import { getEnvVariable } from "../../utils/environment";

/**
 * Base64 encoding helper
 */
const encodeBase64 = (uri: string) => {
  return btoa(uri);
};

/**
 * Forward URI encoding helper
 */
const encodeForwardUri = (uri: string) => {
  // Since base64 produces equal signs on the end, it needs to be further encoded
  return encodeURI(encodeBase64(uri));
};

/**
 * OIDC variables
 */
export const getOidcConfig = () => {
  const URL = getURL();
  const ID = getEnvVariable("VITE_APP_ID");
  return {
    authority: getEnvVariable("VITE_AUTHENTICATION_SERVER"),
    client_id: ID,
    redirect_uri: `${URL}/oidc-signin-callback.html?forward_uri=${encodeForwardUri(
      URL
    )}`,
    silent_redirect_uri: `${URL}/oidc-silent-callback.html`,
    post_logout_redirect_uri: URL,
    response_type: "code",
    loadUserInfo: true,
    automaticSilentRenew: true,
    revokeTokensOnSignout: true,
  };
};

/**
 * Helper to generate redirect Uri
 */
export const generateRedirectUri = (forwardUri: string) => {
  const URL = getURL();
  return `${URL}/oidc-signin-callback.html?forward_uri=${encodeForwardUri(
    forwardUri
  )}`;
};

export const getURL = () => {
  return getEnvVariable("VITE_URL");
};
/**
 * OIDC Session storage key name
 */
export const getOidcIdentityStorageKey = () => {
  const oidcConfig = getOidcConfig();
  return `oidc.user:${oidcConfig.authority}:${oidcConfig.client_id}`;
};
