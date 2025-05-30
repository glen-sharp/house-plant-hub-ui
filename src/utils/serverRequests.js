import Cookies from 'js-cookie';

const hostIpAddress = process.env.REACT_APP_HOST_IP_ADDRESS;

const BASE_URL = hostIpAddress + '/api/v1/'

async function handleResponse(res) {
    if (res.status === 401) {
        window.location.replace('/login');
    } else if (res.status !== 200) {
        const errorData = await res.json();
        const errorResponse = {
            status: res.status,
            message: errorData.message
        }

        throw new Error(JSON.stringify(errorResponse));
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

function GetReadingHistory(plantId) {
    return fetch(BASE_URL + 'reading_history/?plant_id=' + plantId, {
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

export {
    GetReadings,
    RegisterUser,
    UserLogin,
    GetReadingHistory,
}