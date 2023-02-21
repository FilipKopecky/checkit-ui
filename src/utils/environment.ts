/**
 * Returns environment variable. Prefers window config over .env files.
 * Window config comes from Docker
 * @param key The key of the env variable
 */
export const getEnvVariable = (key: string) => {
  const config = (window as any).__config__;
  if (config) {
    return config[key] ?? import.meta.env[key];
  }
  return import.meta.env[key];
};
