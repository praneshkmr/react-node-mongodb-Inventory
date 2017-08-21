import { incrementCounter } from "./../dao/mongo/impl/CounterDAO";

export function getNextUserId(callback) {
    incrementCounter("user", callback);
}

export function getNextInventoryId(callback) {
    incrementCounter("inventory", callback);
}
