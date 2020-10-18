import { enviroment } from "../recursos/utils/const";
//import localStorage from "../utilitarios/localStorage";
const axios = require('axios')

const SERVICE_ENVIROMENT = {
    DEV: "https://us-central1-sanitosapp-d0b5f.cloudfunctions.net/",
    PROD: "https://us-central1-sanitosapp-d0b5f.cloudfunctions.net/",
}
const baseURL = SERVICE_ENVIROMENT[enviroment];

// export 
const baseInstanceAxios = axios.create({
    baseURL,
    timeout: 30000
});

const getToken = async () => {
    try {
        let token = ""; //localStorage.prototype.token;
        // console.log("token", token)
        return token;
    } catch (error) {
        // console.log("getToken ERROR:", error.message);
        return;
    }
};

const isAxiosHandlerEnabled = (config = {}) => {
    // return config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled ? false : true;
    return Object.prototype.hasOwnProperty.call(config, "handlerEnabled") &&
        !config.handlerEnabled
        ? false
        : true;
};

const requestAxiosHandler = async request => {
    if (isAxiosHandlerEnabled(request)) {
        const token = await getToken();
        request.headers["Content-Type"] = "application/x-www-form-urlencoded";
        if (token)
            request.headers["Authorization"] = "Bearer " + token;

    }
    return request;
};

const successAxiosHandler = response => {
    if (isAxiosHandlerEnabled(response.config)) {
        if (response.status == 200) {
            // Handle responses
            // if (response.data.mo.type = "success") {
            return response.data;
            // }
            // throw new Error(response.statusText);

        }
    }
    throw new Error(response.statusText);
};

const errorAxiosHandler = error => {
    if (isAxiosHandlerEnabled(error.config)) {
        console.log("errorAxiosHandler >", error);
    }
    return Promise.reject({ ...error });
};

// Add interceptors
baseInstanceAxios.interceptors.request.use(request =>
    requestAxiosHandler(request)
);

baseInstanceAxios.interceptors.response.use(
    response => successAxiosHandler(response),
    error => errorAxiosHandler(error)
);

class ServiceManager {
    Get(params, test = false) {
        let { url = null, urlIsRelative = true } = params;
        return baseInstanceAxios
            .get(url)
            .then(response => {
                return response;
            })
            .catch(error => {
                throw error;
            });
    }

    Post(params, test = false) {
        let { url = null, data = null, urlIsRelative = true } = params;
        // console.log("data", data)
        return baseInstanceAxios
            .post(url, data)
            .then(response => {
                return response;
            })
            .catch(error => {
                throw error;
            });
    }
}

export default ServiceManager;