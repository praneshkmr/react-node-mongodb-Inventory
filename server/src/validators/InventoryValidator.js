import validator from "validator";

export function validateCreateInventory(data, callback) {
    var errors = {};
    if (!data.productId) {
        errors["productId"] = "productId is Required";
    }
    if (!data.productName) {
        errors["productName"] = "productName is Required";
    }
    if (!data.mrp) {
        errors["mrp"] = "mrp is Required";
    }
    if (!(data.batch && data.batch.number)) {
        errors["batch.number"] = "batch.number is Required";
    }
    if (!(data.batch && data.batch.date)) {
        errors["batch.date"] = "batch.date is Required";
    }
    if (!data.quantity) {
        errors["quantity"] = "quantity is Required";
    }
    if (Object.keys(errors).length === 0) {
        callback();
    }
    else {
        callback(errors);
    }
}
