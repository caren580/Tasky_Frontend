import  axios  from 'axios'

const VITE_API_URL = import.meta.env.VITE_API_URL;
const axiosInstance = axios.create({
     baseURL: VITE_API_URL
    //  || "http://localhost:3000/api"
     ,
    withCredentials: true
})

async function getTasks() {
  try {
    const response = await axiosInstance.get('/tasks');
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
}

getTasks();

export default axiosInstance