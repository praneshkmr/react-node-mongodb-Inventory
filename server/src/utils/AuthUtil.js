import { validateUserToken } from "./../services/UserService";

export function verifyAuthMiddleware(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['authorization'];
    if (token) {
        validateUserToken(token, function (err, decoded) {
            if (err) {
                return res.status(401).send('Failed to authenticate token.');
            } else {
                req.session = decoded;
                next();
            }
        });
    } else {
        return res.status(401).send('No token provided.');
    }
}
