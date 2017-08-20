import validator from "validator";

export function validateCreateMember(data, callback) {
    var errors = {};
    if (!data.email) {
        errors.email = "Email is Required";
    }
    else {
        if (!validator.isEmail(data.email)) {
            errors.email = "Email Not Valid";
        }
    }
    if (!data.name) {
        errors.name = "Name is Required";
    }
    if (!data.password) {
        errors.password = "Password is Required";
    }
    if (Object.keys(errors).length === 0) {
        callback();
    }
    else {
        callback(errors);
    }
}

export function validateLoginMember(data, callback) {
    var errors = {};
    if (!data.email) {
        errors.email = "Email Number Required";
    }
    if (!data.password) {
        errors.password = "Password is Required";
    }
    if (Object.keys(errors).length === 0) {
        callback();
    }
    else {
        callback(errors);
    }
}
