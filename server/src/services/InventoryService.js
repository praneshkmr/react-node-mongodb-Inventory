import async from "async";

import {
    createInventory as createInventoryDAO,
    getInventoryById as getInventoryByIdDAO,
    updateInventoryById as updateInventoryByIdDAO
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
                data.status = "approved";
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
                        waterfallCallback();
                    }
                    else {
                        const err = new Error("Only Pending Inventories can be approved");
                        waterfallCallback(err);
                    }
                }
            })
        },
        function (waterfallCallback) {
            const id = data.id;
            const update = {
                status: "approved",
                $push: {
                    history: {
                        action: "approved",
                        userId: data.userSession.userId
                    }
                }
            }
            updateInventoryByIdDAO(id, update, waterfallCallback);
        }
    ], callback);
}