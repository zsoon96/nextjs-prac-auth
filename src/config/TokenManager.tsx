import axios from "axios";
import cookie from "react-cookies";

function setToken (token: string) {
    axios.defaults.headers.Authorization = 'Bearer ' + token
    // axios.defaults.headers.common["Authorization"] = `${token}`
    cookie.save('token', token, { path: '/', httpOnly: false })
}

export {setToken};