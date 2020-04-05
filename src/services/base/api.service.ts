import axios from 'axios';

// const env = process.env.NODE_ENV;
let urlBase = 'http://localhost:3400/v1';

// if (env === 'development') {
//   urlBase = 'http://localhost:3400';
// } else {
//   urlBase = '';
// }

const HttpService = axios.create({
  baseURL: urlBase,
});

export default HttpService;
