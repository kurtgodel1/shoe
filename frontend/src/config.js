// config.js
const dev = {
    API_URL: 'http://localhost:8000',
  };
  
  const prod = {
    API_URL: 'https://your-deployment-url.com',
  };
  
  const config = process.env.NODE_ENV === 'development' ? dev : prod;
  
  export default config;
  