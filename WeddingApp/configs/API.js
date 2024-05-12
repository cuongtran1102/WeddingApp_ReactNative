import axios from "axios"

const SERVER = 'https://anhquoc0304.pythonanywhere.com'
export const Endpoints = {
    'user': {
        'login': '/o/token/',
        'current': '/users/current-user/',
        'register': '/users/',
        'edit': '/users/edit/',
        'change-password': '/users/change-password/',
        'role': '/users/role/'
    },
    'wedding-hall': {
        'list': '/wedding-hall/'
    },
    'party': {
        'history': 'wedding-party/history/',
        'add': 'weddingapp/wedding-party/',
        'detail': (partyId) => `wedding-party/${partyId}/`,
        'feedback': (partyId) => `wedding-party/${partyId}/feedbacks/`
    },
    'menu': {
        'list': '/menus/',
        'detail': (id) => `/menus/${id}/`
    },
    'service': {
        'list': '/services/',
        'detail': (id) => `/services/${id}/`
    },
    'feedback': {
        'party': '/feedbacks/party/',
        'hall': '/feedbacks/hall/',
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