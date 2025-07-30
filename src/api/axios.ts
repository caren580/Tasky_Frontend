import  axios  from 'axios'

const VITE_API_URL = import.meta.env.VITE_API_URL;
const axiosInstance = axios.create({
     baseURL: VITE_API_URL
    //  || "http://localhost:3000/api"
     ,
    withCredentials: true
})

// async function getTasks() {
//   try {
//     const response = await axiosInstance.get('/tasks');
//     console.log(response.data);
//   } catch (error) {
//     console.error("Error fetching tasks:", error);
//   }
// }

// getTasks();


// // const API_BASE_URL = import.meta.env.VITE_API_URL;

// async function fetchTasks() {
//   try {
//     const response = await fetch(`${VITE_API_URL}/tasks`);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error("Error fetching tasks:", error);
//   }
// }

// // Call the function to fetch tasks
// fetchTasks();




export default axiosInstance



// import axios from 'axios';

// const VITE_API_URL = import.meta.env.VITE_API_URL;

// const axiosInstance = axios.create({
//   baseURL: VITE_API_URL,
//   withCredentials: true,
// });

// // Optional: prevent multiple redirects
// let hasRedirected = false;

// // ✅ Add interceptor
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !hasRedirected
//     ) {
//       hasRedirected = true;

//       // Redirect to login page (can customize this)
//       window.location.href = '/login';
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
