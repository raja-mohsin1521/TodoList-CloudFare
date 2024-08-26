import axios from 'axios';

 const apiClient = axios.create({
    baseURL: 'https://backend.mohsinmunirf21.workers.dev',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  export default apiClient