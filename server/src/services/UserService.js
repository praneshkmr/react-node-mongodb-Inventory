import async from "async";

import { getNextUserId } from "./CounterService";
import { createUser, getUserById } from "./../dao/mongo/impl/UserDAO";

export function createUser(data, callback) {
    async.waterfall([
        function (waterfallCallback) {
            getNextUserId(function (err, counterDoc) {
                waterfallCallback(err, data, counterDoc);
            });
        },
        function (data, counterDoc, waterfallCallback) {
            data.id = counterDoc.counter;
            data.source = "client";
            createUser(data, waterfallCallback);
        }
    ], callback);
}

export function getUserById(id, callback) {
    getUserById(id, callback);
}
