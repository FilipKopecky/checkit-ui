import axios from "axios";
import Constants from "./Constants";
import { getEnvVariable } from "./environment";
import { getToken } from "../components/auth/utils";

export class Ajax {
  protected axiosInstance = axios.create({
    baseURL: getEnvVariable("VITE_SERVER"),
  });

  constructor() {
    this.axiosInstance.interceptors.request.use((reqConfig) => {
      reqConfig.headers[Constants.HEADERS.AUTHORIZATION] = getToken();
      return reqConfig;
    });
  }

  public get(path: string) {
    return this.axiosInstance.get(path);
  }

  public post(path: string, content: any) {
    return this.axiosInstance.post(path, content);
  }
}

const instance = new Ajax();

export default instance;
