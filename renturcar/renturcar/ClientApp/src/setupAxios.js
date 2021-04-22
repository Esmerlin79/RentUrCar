import axios from "axios"


const hostUrl = `https://${window.location.host}`;
export const setupAxios = () => {
    axios.interceptors.request.use(
    (config) => {
        // if the request goes to the server send the user token
        if (config.url.includes(hostUrl)){
            const userToken = localStorage.getItem("userToken");
            
            if (userToken){
                config.headers.Autorization = userToken;
            }

            return config;
        }
    },
    (error) => {
        return Promise.reject(error);
    });
}
