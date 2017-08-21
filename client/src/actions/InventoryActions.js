import axios from "axios";

export const ADD_INVENTORY_STARTED = "ADD_INVENTORY_STARTED";
export const ADD_INVENTORY_FULFILLED = "ADD_INVENTORY_FULFILLED";
export const ADD_INVENTORY_REJECTED = "ADD_INVENTORY_REJECTED";

export const GET_INVENTORIES_STARTED = "GET_INVENTORIES_STARTED";
export const GET_INVENTORIES_FULFILLED = "GET_INVENTORIES_FULFILLED";
export const GET_INVENTORIES_REJECTED = "GET_INVENTORIES_REJECTED";

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

export function getInventories(data) {
    return function (dispatch) {
        dispatch({ type: GET_INVENTORIES_STARTED });
        return axios.get(WS_URL, { headers: { Authorization: data.token } })
            .then(function (response) {
                return response.data;
            })
            .then(function (data) {
                dispatch({ type: GET_INVENTORIES_FULFILLED, payload: data });
                return data;
            })
            .catch(function (error) {
                const response = error.response;
                dispatch({ type: GET_INVENTORIES_REJECTED, payload: response });
                throw response;
            })
    }
}