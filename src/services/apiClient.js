import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://www-finallab3-9600.restdb.io/rest/', 
  headers: {
    'x-apikey': 'b6f057ddb81d49550db78a23fe3763d186dae' 
  }
});

export default apiClient;
