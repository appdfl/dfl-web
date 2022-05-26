//https://dfl-api.herokuapp.com/
//http://192.168.1.102:4000

export const api = axios.create({
    baseURL: 'https://dfl-api.herokuapp.com/http://127.0.0.1:5555',
    timeout: 15 * 1000,
    timeoutErrorMessage: 'Timeout error',
});