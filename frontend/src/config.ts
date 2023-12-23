// config.js
const dev = {
    API_URL: 'http://localhost:8000',
  };
  
const prod = {
    API_URL: 'https://shoesale-1ebb58ec0831.herokuapp.com',
  };
  
const config = process.env.NODE_ENV === 'development' ? dev : prod;
  
export default config;
  