const useEnvURL = false;
export const API_URL = useEnvURL
  ? process.env.REACT_APP_API_URL
  : "http://localhost:3000";
