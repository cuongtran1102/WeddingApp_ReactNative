import axios from "axios"

const SERVER = 'https://anhquoc0304.pythonanywhere.com'
export const Endpoints = {
    'user': {
        'login': '/o/token/',
        'current': '/users/current-user/',
        'register': '/users/',
        'edit': '/users/edit/',
        'change-password': '/users/change-password/'
    },
    'wedding-hall': {
        'list': '/wedding-hall/'
    },
    'party': {
        'history': 'wedding-party/history/',
        'add': 'weddingapp/wedding-party/'
    },
    'menu': {
        'list': '/menus/',
        'detail': (id) => `/menus/${id}/`
    },
    'service': {
        'list': '/services/',
        'detail': (id) => `/services/${id}/`
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