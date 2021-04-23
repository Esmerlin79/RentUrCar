import axios from 'axios';

axios.defaults.baseURL = 'https://localhost:44328/api';

axios.interceptors.request.use(config => {
   config.headers.common["type"] = "Web";
   config.headers.common["version"] = "v1";  
   config.headers.common["Content-Type"] = "application/json";  
    const token = window.localStorage.getItem("token");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    }
}, error => {
    return Promise.reject('There was an error adding the token '+ error);
});


const requestGeneric = {
    get: (url) => axios.get(url),
    post: (url, body) => axios.post(url, body),
    put: (url, body) => axios.put(url, body), 
    delete: (url) => axios.delete(url)
};

export default requestGeneric;