import axios from 'axios'

let ajax = axios.create({
    baseURL: 'http://127.0.0.1:8002/',
});

export default ajax;
