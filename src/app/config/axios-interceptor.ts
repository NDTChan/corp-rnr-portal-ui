import axios from 'axios';

const TIMEOUT = 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = SERVER_API_URL;

const setupAxiosInterceptors = () => {
  const onResponseSuccess = response => response;
  const onResponseError = err => Promise.reject(err);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
