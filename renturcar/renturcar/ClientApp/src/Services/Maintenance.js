import {API_URL} from './config'
import axios from 'axios'

// export const postData = async (endpoint,data) => {
//     const result = await fetch(`${API_URL}${endpoint}`, {
//         method: 'POST',
//         headers: {'Content-type':'application/json'},
//         body: JSON.stringify(data)
//     });
//     return (await result).json()
// }

export const postData = async (endpoint,data) => {
    const result = await axios.post(`${API_URL}${endpoint}`,data);
    return (await result).json();
}
export const getAll = async (endpoint) => {
    const data = await axios(`${API_URL}${endpoint}`)
    return (await data).json()
}
export const getDetails = async (endpoint, id) => {
    const data = await axios(`${API_URL}${endpoint}/${id}`)
    return (await data).json()
}
