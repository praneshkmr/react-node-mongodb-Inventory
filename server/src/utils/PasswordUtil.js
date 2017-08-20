import bcrypt from "bcrypt";

const saltRounds = 10;

export function generatePasswordHash(password, callback) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            callback(err, hash);
        });
    });
}

export function validatePasswordHash(password, hash, callback) {
    bcrypt.compare(password, hash, function (err, isSame) {
        callback(err, isSame);
    });
}