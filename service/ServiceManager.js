import { enviroment } from "../recursos/utils/const";
//import localStorage from "../utilitarios/localStorage";
const axios = require("axios");

const SERVICE_ENVIROMENT = {
  DEV: "https://us-central1-sanitosapp-d0b5f.cloudfunctions.net",
  PROD: "https://us-central1-sanitosapp-d0b5f.cloudfunctions.net",
};
const baseURL = SERVICE_ENVIROMENT[enviroment];

class ServiceManager {
  Post(params) {
    let { url = null, data = null } = params;
    const URL = `${baseURL}${url}`;

    return axios
      .post(URL, data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  }
}

export default ServiceManager;
