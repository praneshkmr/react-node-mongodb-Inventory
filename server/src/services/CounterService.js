import { incrementCounter } from "./../dao/mongo/impl/CounterDAO";

export function getNextUserId(callback) {
    incrementCounter("member", callback);
}
