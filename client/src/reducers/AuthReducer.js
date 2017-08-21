import { USER_LOGIN_STARTED, USER_LOGIN_FULFILLED, USER_LOGIN_REJECTED, USER_LOGOUT_FULFILLED } from "./../actions/AuthActions";

const initialState = {
    token: null,
    user: null,
    isLoggingIn: false,
    loggingInError: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case "persist/REHYDRATE": {
            return action.payload.auth || initialState;
        }
        case USER_LOGIN_STARTED: {
            return { ...state, isLoggingIn: true };
        }
        case USER_LOGIN_FULFILLED: {
            const { user, token } = action.payload;
            return { ...state, isLoggingIn: false, user: user, token: token };
        }
        case USER_LOGIN_REJECTED: {
            const error = action.payload.data;
            return { ...state, isLoggingIn: false, loggingInError: error };
        }
        case USER_LOGOUT_FULFILLED: {
            return { ...state, token: null, user: null };
        }
        default: {
            return state;
        }
    }
}