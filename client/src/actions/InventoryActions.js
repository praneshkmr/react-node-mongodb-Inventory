import axios from "axios";

export const ADD_INVENTORY_STARTED = "ADD_INVENTORY_STARTED";
export const ADD_INVENTORY_FULFILLED = "ADD_INVENTORY_FULFILLED";
export const ADD_INVENTORY_REJECTED = "ADD_INVENTORY_REJECTED";

export const GET_INVENTORIES_STARTED = "GET_INVENTORIES_STARTED";
export const GET_INVENTORIES_FULFILLED = "GET_INVENTORIES_FULFILLED";
export const GET_INVENTORIES_REJECTED = "GET_INVENTORIES_REJECTED";

export const DELETE_INVENTORY_STARTED = "DELETE_INVENTORY_STARTED";
export const DELETE_INVENTORY_FULFILLED = "DELETE_INVENTORY_FULFILLED";
export const DELETE_INVENTORY_REJECTED = "DELETE_INVENTORY_REJECTED";

export const GET_PENDING_INVENTORIES_STARTED = "GET_PENDING_INVENTORIES_STARTED";
export const GET_PENDING_INVENTORIES_FULFILLED = "GET_PENDING_INVENTORIES_FULFILLED";
export const GET_PENDING_INVENTORIES_REJECTED = "GET_PENDING_INVENTORIES_REJECTED";

export const APPROVE_INVENTORY_STARTED = "APPROVE_INVENTORY_STARTED";
export const APPROVE_INVENTORY_FULFILLED = "APPROVE_INVENTORY_FULFILLED";
export const APPROVE_INVENTORY_REJECTED = "APPROVE_INVENTORY_REJECTED";

export const UPDATE_INVENTORY_STARTED = "UPDATE_INVENTORY_STARTED";
export const UPDATE_INVENTORY_FULFILLED = "UPDATE_INVENTORY_FULFILLED";
export const UPDATE_INVENTORY_REJECTED = "UPDATE_INVENTORY_REJECTED";

export const SET_UPDATING_INVENTORY_FULFILLED = "SET_UPDATING_INVENTORY_FULFILLED";

const WS_URL = "http://localhost:3000/inventories/";

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

export function getPendingInventories(data) {
    return function (dispatch) {
        dispatch({ type: GET_PENDING_INVENTORIES_STARTED });
        return axios.get(WS_URL + "pending", { headers: { Authorization: data.token } })
            .then(function (response) {
                return response.data;
            })
            .then(function (data) {
                dispatch({ type: GET_PENDING_INVENTORIES_FULFILLED, payload: data });
                return data;
            })
            .catch(function (error) {
                const response = error.response;
                dispatch({ type: GET_PENDING_INVENTORIES_REJECTED, payload: response });
                throw response;
            })
    }
}

export function approveInventory(data) {
    const inventory = data.inventory;
    return function (dispatch) {
        dispatch({ type: APPROVE_INVENTORY_STARTED });
        return axios.put(WS_URL + inventory.id + "/approve", null, { headers: { Authorization: data.token } })
            .then(function (response) {
                return response.data;
            })
            .then(function (data) {
                dispatch({ type: APPROVE_INVENTORY_FULFILLED, payload: data });
                return data;
            })
            .catch(function (error) {
                const response = error.response;
                dispatch({ type: APPROVE_INVENTORY_REJECTED, payload: response });
                throw response;
            })
    }
}

export function deleteInventory(data) {
    const inventory = data.inventory;
    return function (dispatch) {
        dispatch({ type: DELETE_INVENTORY_STARTED });
        return axios.delete(WS_URL + inventory.id, { headers: { Authorization: data.token } })
            .then(function (response) {
                return response.data;
            })
            .then(function (data) {
                dispatch({ type: DELETE_INVENTORY_FULFILLED, payload: data });
                return data;
            })
            .catch(function (error) {
                const response = error.response;
                dispatch({ type: DELETE_INVENTORY_REJECTED, payload: response });
                throw response;
            })
    }
}

export function setUpdatingInventory(id) {
    return function (dispatch) {
        dispatch({ type: SET_UPDATING_INVENTORY_FULFILLED, payload: id });
    }
}

export function updateInventory(inventory) {
    return function (dispatch) {
        dispatch({ type: UPDATE_INVENTORY_STARTED });
        return axios.put(WS_URL + inventory.id, inventory)
            .then(function (response) {
                return response.data;
            })
            .then(function (data) {
                dispatch({ type: UPDATE_INVENTORY_FULFILLED, payload: data });
                return data;
            })
            .catch(function (error) {
                const response = error.response;
                dispatch({ type: UPDATE_INVENTORY_REJECTED, payload: response });
                throw response;
            })
    }
}