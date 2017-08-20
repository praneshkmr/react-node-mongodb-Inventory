import { USER_LOGIN_STARTED, USER_LOGIN_FULFILLED, USER_LOGIN_REJECTED } from "./../actions/AuthActions";

const initialState = {
    token: null,
    user: null,
    isLoggingIn: false,
    loggingInError: null
}

export default function (state = initialState, action) {
    switch (action.type) {
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
        default: {
            return state;
        }
    }
}