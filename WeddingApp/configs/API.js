import axios from "axios"

const SERVER = 'https://anhquoc0304.pythonanywhere.com'
export const Endpoints = {
    'user': {
        'login': '/o/token/',
        'current': '/users/current-user/',
        'register': '/users/',
        'edit': '/users/edit'
    },
    'wedding-hall': {
        'list': '/wedding-hall/'
    }
}

export default axios.create({
    baseURL: SERVER
})

export const AuthAPI = (token) => {
    return axios.create({
        baseURL: SERVER,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}