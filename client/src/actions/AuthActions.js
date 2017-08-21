import axios from "axios";

export const USER_LOGIN_STARTED = "USER_LOGIN_STARTED";
export const USER_LOGIN_FULFILLED = "USER_LOGIN_FULFILLED";
export const USER_LOGIN_REJECTED = "USER_LOGIN_REJECTED";

export const USER_LOGOUT_FULFILLED = "USER_LOGOUT_FULFILLED";

const WS_URL = "http://localhost:3000/users/login";

export function loginUser(data) {
    return function (dispatch) {
        dispatch({ type: USER_LOGIN_STARTED });
        return axios.post(WS_URL, data)
            .then(function (response) {
                return response.data;
            })
            .then(function (data) {
                dispatch({ type: USER_LOGIN_FULFILLED, payload: data });
                return data;
            })
            .catch(function (error) {
                const response = error.response;
                dispatch({ type: USER_LOGIN_REJECTED, payload: response });
                throw response;
            })
    }
}

export function logoutUser() {
    return function (dispatch) {
        dispatch({ type: USER_LOGOUT_FULFILLED });
    }
}