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
  let URL = import.meta.env.VITE_URL;
  if (import.meta.env.VITE_NETLIFY) {
    URL =
      import.meta.env.VITE_NETLIFY_CONTEXT === "production"
        ? import.meta.env.VITE_NETLIFY_URL // main Netlify URL
        : import.meta.env.VITE_NETLIFY_DEPLOY_PRIME_URL // deploy preview
  }
  const ID = import.meta.env.VITE_APP_ID;
  return {
    authority: import.meta.env.VITE_AUTHENTICATION_SERVER,
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
  let URL = import.meta.env.VITE_URL;
  if (import.meta.env.VITE_NETLIFY) {
    URL =
      import.meta.env.VITE_NETLIFY_CONTEXT === "production"
        ? "NETLIFY_URL" // main Netlify URL
        : "NETLIFY_DEPLOY_PRIME_URL"; // deploy preview
  }
  return `${URL}/oidc-signin-callback.html?forward_uri=${encodeForwardUri(
    forwardUri
  )}`;
};

/**
 * OIDC Session storage key name
 */
export const getOidcIdentityStorageKey = () => {
  const oidcConfig = getOidcConfig();
  return `oidc.user:${oidcConfig.authority}:${oidcConfig.client_id}`;
};
