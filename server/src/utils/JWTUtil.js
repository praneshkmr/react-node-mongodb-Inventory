import config from "config";
import jwt from "jsonwebtoken";

export default class JWTUtil {
    constructor(options) {
        const secretKey = options.secretKey;
        const expiresIn = options.expiresIn;
        if (!secretKey) {
            throw new Error("secretKey Needed");
        };
        this.SECRET_KEY = secretKey;
        this.EXPIRES_IN = expiresIn;
    }
    signPayload(payload, callback) {
        const token = jwt.sign(payload, this.SECRET_KEY, {
            expiresIn: this.EXPIRES_IN
        });
        callback(null, token);
    }
    verifyToken(token, callback) {
        jwt.verify(token, this.SECRET_KEY, callback);
    }
}
