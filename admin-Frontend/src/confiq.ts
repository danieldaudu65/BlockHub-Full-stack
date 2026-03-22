const getToken = () => localStorage.getItem("ambassador_token");
// const API_URL = "https://blockhub-server.onrender.com"
const API_URL = "http://localhost:8080";


export { API_URL, getToken };