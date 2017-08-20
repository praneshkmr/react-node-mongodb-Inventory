import async from "async";

import { getNextUserId } from "./CounterService";
import UserDAO from "./../dao/mongo/impl/UserDAO";

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
            UserDAO.createUser(data, waterfallCallback);
        }
    ], callback);
}

export function getUserById(id, callback) {
    UserDAO.getUserById(id, callback);
}
