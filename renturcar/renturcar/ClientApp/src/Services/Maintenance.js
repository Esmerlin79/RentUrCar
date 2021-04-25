import { setupAxios } from '../setupAxios';
// export const postData = async (endpoint,data) => {
//     const result = await fetch(`${API_URL}${endpoint}`, {
//         method: 'POST',
//         headers: {'Content-type':'application/json'},
//         body: JSON.stringify(data)
//     });
//     return (await result).json()
// }

export const postData = async (endpoint,data) => {
    const result = await setupAxios.post(`${endpoint}`,data);
    return (await result).json();
}
export const getAll = async (endpoint) => {
    const data = await setupAxios(`${endpoint}`)
    return (await data).json()
}
// export const getDetails = async (endpoint, id) => {
//     const data = await setupAxios(`${endpoint}/${id}`)
//     return (await data).json()
// }
