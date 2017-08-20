import mongoose from "mongoose";
import config from "config";
import { createMongoUri } from "./../../utils/URIUtil";

mongoose.Promise = global.Promise;
const mongoConfig = config.get('mongo');

mongoose.connect(createMongoUri(mongoConfig), function (err) {
    console.log("MongoDB Connection URI: ", createMongoUri(mongoConfig));
    if (err) {
        console.log("Failed to connect to MongoDB");
        console.error(err);
    } else {
        console.log("Successfully connected to MongoDB");
    }
});
