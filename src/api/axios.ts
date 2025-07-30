import  axios  from 'axios'

const VITE_API_URL = import.meta.env.VITE_API_URL;
const axiosInstance = axios.create({
     baseURL: `${VITE_API_URL}/api`,
    withCredentials: true
})
//   


// errors
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // Clear user data from store
//       localStorage.removeItem('tasky_user');
//       // Redirect to login page
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance
