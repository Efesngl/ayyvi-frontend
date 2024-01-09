import axios from "axios"
const a = axios.create({
    baseURL: 'http://api.ayyvi.com/api/v1/',
    withCredentials:true,
});
export default a;