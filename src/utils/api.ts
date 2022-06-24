//https://dfl-api.herokuapp.com/
//http://192.168.1.102:4000

import axios from "axios";

export const api = axios.create({
    baseURL: 'https://dfl-api.herokuapp.com/',
    headers: {
        AccessControlAllowOrigin: `*`,
    },
    timeout: 15 * 1000,
    timeoutErrorMessage: 'Timeout error',
});