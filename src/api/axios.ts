import  axios  from 'axios'

const axiosInstance = axios.create({
     baseURL: import.meta.env.VITE_URL,
    withCredentials: true
    // withCredentials: true
// 
})
export default axiosInstance