import async from "async";

import { getNextUserId } from "./CounterService";
import { createUser as createUserDAO, getUserById as getUserByIdDAO } from "./../dao/mongo/impl/UserDAO";
import { generatePasswordHash } from "./../utils/PasswordUtil";

export function createUser(data, callback) {
    async.waterfall([
        function (waterfallCallback) {
            generatePasswordHash(data.password, function (err, hash) {
                if (err) {
                    waterfallCallback(err);
                }
                else {
                    data.passwordHash = hash;
                    delete data.password;
                    waterfallCallback();
                }
            })
        },
        function (waterfallCallback) {
            getNextUserId(function (err, counterDoc) {
                waterfallCallback(err, data, counterDoc);
            });
        },
        function (data, counterDoc, waterfallCallback) {
            data.id = counterDoc.counter;
            createUserDAO(data, waterfallCallback);
        }
    ], callback);
}

export function getUserById(id, callback) {
    getUserByIdDAO(id, callback);
}
