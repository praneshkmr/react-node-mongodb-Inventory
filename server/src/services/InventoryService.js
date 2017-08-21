import async from "async";

import {
    createInventory as createInventoryDAO,
    getInventoryById as getInventoryByIdDAO,
    updateInventoryById as updateInventoryByIdDAO,
    getInventories as getInventoriesDAO
} from "./../dao/mongo/impl/InventoryDAO";
import { getNextInventoryId } from "./CounterService";

export function createInventory(data, callback) {
    async.waterfall([
        function (waterfallCallback) {
            const { roles } = data.userSession;
            const { isStoreManager, isDepartmentManager } = getUserRoles(roles);
            if (isDepartmentManager) {
                data.status = "pending";
            }
            if (isStoreManager) {
                data.status = "approved";
            }
            if (data.status) {
                waterfallCallback();
            }
            else {
                const err = new Error("Not Enough Permission to create Inventory");
                waterfallCallback(err);
            }
        },
        function (waterfallCallback) {
            getNextInventoryId(function (err, counterDoc) {
                waterfallCallback(err, data, counterDoc);
            });
        },
        function (data, counterDoc, waterfallCallback) {
            data.id = counterDoc.counter;
            data.history = [{
                action: "created",
                userId: data.userSession.userId
            }]
            createInventoryDAO(data, waterfallCallback);
        }
    ], callback);
}

function getUserRoles(roles) {
    const isStoreManager = roles.indexOf("storeManager") >= 0;
    const isDepartmentManager = roles.indexOf("deliveryManager") >= 0;
    return { isStoreManager, isDepartmentManager };
}

export function approveInventory(data, callback) {
    async.waterfall([
        function (waterfallCallback) {
            const { roles } = data.userSession;
            const { isStoreManager, isDepartmentManager } = getUserRoles(roles);
            if (isStoreManager) {
                waterfallCallback();
            }
            else {
                const err = new Error("Not Enough Permission to approve Inventory");
                waterfallCallback(err);
            }
        },
        function (waterfallCallback) {
            const id = data.id;
            getInventoryByIdDAO(id, function (err, inventory) {
                if (err) {
                    waterfallCallback(err);
                }
                else {
                    if (inventory.status == "pending") {
                        waterfallCallback(null, inventory);
                    }
                    else {
                        const err = new Error("Only Pending Inventories can be approved");
                        waterfallCallback(err);
                    }
                }
            })
        },
        function (inventory, waterfallCallback) {
            const latestHistory = getLatestHistory(inventory);
            console.log(latestHistory);
            if (latestHistory.type === "created") {
                const update = {
                    status: "approved",
                    $push: {
                        history: {
                            action: "approved",
                            userId: data.userSession.userId
                        }
                    }
                }
                const id = data.id;
                updateInventoryByIdDAO(id, update, waterfallCallback);
            }
            else if (latestHistory.type === "removed") {
                const update = {
                    status: "approved",
                    isRemoved: true,
                    $push: {
                        history: {
                            action: "approved",
                            userId: data.userSession.userId
                        }
                    }
                }
                const id = data.id;
                updateInventoryByIdDAO(id, update, waterfallCallback);
            }
            else {
                const err = new Error("Weird Flow in Inventory Approval");
                waterfallCallback(err);
            }
        }
    ], callback);
}

function getLatestHistory(inventory) {
    let latestHistory = null
    inventory.history.forEach(function (history) {
        if (latestHistory) {
            if ((new Date(history.timestamp)).getTime() > (new Date(latestHistory.history)).getTime()) {
                latestHistory = history;
            }
        }
        else {
            latestHistory = history;
        }
    }, this);
    return latestHistory;
}

export function removeInventory(data, callback) {
    async.waterfall([
        function (waterfallCallback) {
            const { roles } = data.userSession;
            const { isStoreManager, isDepartmentManager } = getUserRoles(roles);
            if (isDepartmentManager || isStoreManager) {
                waterfallCallback();
            }
            else {
                const err = new Error("Not Enough Permission to remove Inventory");
                waterfallCallback(err);
            }
        },
        function (waterfallCallback) {
            const id = data.id;
            getInventoryByIdDAO(id, function (err, inventory) {
                if (err) {
                    waterfallCallback(err);
                }
                else {
                    if (inventory.status == "approved") {
                        waterfallCallback(null, inventory);
                    }
                    else {
                        const err = new Error("An Operation is Pending on the Inventory");
                        waterfallCallback(err);
                    }
                }
            });
        },
        function (inventory, waterfallCallback) {
            const { roles } = data.userSession;
            const { isStoreManager, isDepartmentManager } = getUserRoles(roles);
            if (isStoreManager) {
                const update = {
                    status: "approved",
                    isRemoved: true,
                    $push: {
                        history: {
                            action: "removed",
                            userId: data.userSession.userId
                        }
                    }
                }
                const id = data.id;
                updateInventoryByIdDAO(id, update, waterfallCallback);
            }
            else if (isDepartmentManager) {
                const update = {
                    status: "pending",
                    isRemoved: true,
                    $push: {
                        history: {
                            action: "removed",
                            userId: data.userSession.userId
                        }
                    }
                }
                const id = data.id;
                updateInventoryByIdDAO(id, update, waterfallCallback);
            }
        }
    ], callback);
}

export function getInventories(callback) {
    getInventoriesDAO(callback);
}