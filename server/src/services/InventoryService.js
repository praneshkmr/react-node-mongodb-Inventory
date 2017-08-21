import async from "async";

import { createInventory as createInventoryDAO } from "./../dao/mongo/impl/InventoryDAO";
import { getNextInventoryId } from "./CounterService";

export function createInventory(data, callback) {
    async.waterfall([
        function (waterfallCallback) {
            getNextInventoryId(function (err, counterDoc) {
                waterfallCallback(err, data, counterDoc);
            });
        },
        function (data, counterDoc, waterfallCallback) {
            data.status = "pending";
            data.id = counterDoc.counter;
            createInventoryDAO(data, waterfallCallback);
        }
    ], callback);
}