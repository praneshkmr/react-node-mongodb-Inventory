import mongoose from "mongoose";
import Counter from "./../schema/CounterSchema";

export function incrementCounter(counterType, callback) {
    Counter.findOneAndUpdate({ "type": counterType },
        { $inc: { "counter": 1 } }, { "new": true, "upsert": true }, callback);
}