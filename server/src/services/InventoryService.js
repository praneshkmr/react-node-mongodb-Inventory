import async from "async";

import { createInventory as createInventoryDAO } from "./../dao/mongo/impl/InventoryDAO";
import { getNextInventoryId } from "./CounterService";

export function createInventory(data, callback) {
    async.waterfall([
        function (waterfallCallback) {
            const { roles } = data.userSession;
            const isStoreManager = roles.indexOf("storeManager") >= 0;
            const isDepartmentManager = roles.indexOf("deliveryManager") >= 0;
            console.log(isStoreManager, isDepartmentManager);
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