import axios from 'axios'

let ajax = axios.create({
    baseURL: 'http://piccbackend:8002/',
});

export default ajax;
