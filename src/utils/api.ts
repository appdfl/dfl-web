//https://dfl-api.herokuapp.com/
//http://192.168.1.102:4000

import { sign } from "jsonwebtoken";
import axios from "axios";

const token = sign({
    user: {
        id: 123456,
    },
}, process.env.JWT_SECRET, { subject: "9dd802f72331a2635d51b942548201ea", expiresIn: "30d", audience: "web" });

/* axios.interceptors.request.use(
    config => {
        config.headers.authorization = `Bearer ${token}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
) */

export const api = axios.create({
    baseURL: 'https://dfl-api.herokuapp.com/',
    headers: {
        Authorization: `Bearer ${token}`
    },
    timeout: 15 * 1000,
    timeoutErrorMessage: 'Timeout error',
});