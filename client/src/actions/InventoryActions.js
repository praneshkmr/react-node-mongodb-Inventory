import axios from "axios";

export const ADD_INVENTORY_STARTED = "ADD_INVENTORY_STARTED";
export const ADD_INVENTORY_FULFILLED = "ADD_INVENTORY_FULFILLED";
export const ADD_INVENTORY_REJECTED = "ADD_INVENTORY_REJECTED";


const WS_URL = "http://localhost:3000/inventories";

export function addInventory(data) {
    return function (dispatch) {
        dispatch({ type: ADD_INVENTORY_STARTED });
        return axios.post(WS_URL, data)
            .then(function (response) {
                return response.data;
            })
            .then(function (data) {
                dispatch({ type: ADD_INVENTORY_FULFILLED, payload: data });
                return data;
            })
            .catch(function (error) {
                const response = error.response;
                dispatch({ type: ADD_INVENTORY_REJECTED, payload: response });
                throw response;
            })
    }
}