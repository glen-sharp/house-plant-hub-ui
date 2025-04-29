import Cookies from 'js-cookie';

const hostIpAddress = process.env.REACT_APP_HOST_IP_ADDRESS;

const BASE_URL = 'https://' + hostIpAddress + '/api/v1/'

function handleResponse(res) {
    if (res.status === 401) {
        window.location.replace('/login');
    } else if (res.status !== 200) {
        throw new Error(res.status);
    }
    return res;
  }  

function GetReadings() {
    return fetch(BASE_URL + 'readings/', {
        method: 'GET',
        credentials: 'include',
    })
    .then(res => handleResponse(res))
    .then(data => {
        return data
    })
    .catch((error) => {
        throw error;
    });
}

function RegisterUser(user_info) {
    return fetch(BASE_URL + 'register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(user_info)
    })
    .then(res => handleResponse(res))
    .then(data => {
        return data
    })
    .catch((error) => {
        throw error;
    });
}

function UserLogin(login_info) {
    return fetch(BASE_URL + 'auth/login/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken'),
        },
        body: JSON.stringify(login_info)
    })
    .then(res => handleResponse(res))
    .then(data => {
        return data
    })
    .catch((error) => {
        throw error;
    });
}

function UserLogout() {
    return fetch(BASE_URL + 'auth/logout/', {
        method: 'GET',
        credentials: 'include',
    })
    .then(res => handleResponse(res))
    .then(data => {
        return data
    })
    .catch((error) => {
        throw error;
    });
}


export {
    GetReadings,
    RegisterUser,
    UserLogin,
    UserLogout,
}