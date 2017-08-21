import { Router } from "express";
import { createUser, getUserById, loginUser } from "./../services/UserService";
import { validateCreateMember, validateLoginMember } from "./../validators/UserValidator"

const router = Router();

router.post('/', function (req, res, next) {
    validateCreateMember(req.body, function (err) {
        if (err) {
            res.status(400).send(err);
        }
        else {
            const { name, email, roles, password } = req.body;
            const data = { name: { en: name }, email, roles, password };
            createUser(data, function (err, user) {
                if (err) {
                    if (err.message === "Email Already Exists") {
                        res.status(409).send(err.message);
                    }
                    else {
                        console.log(err);
                        res.status(500).send(err);
                    }
                }
                else {
                    res.status(201).send(user);
                }
            });
        }
    });
});

router.post('/login', function (req, res, next) {
    validateLoginMember(req.body, function (err) {
        if (err) {
            res.status(400).send(err);
        }
        else {
            const { email, password } = req.body;
            const data = { email, password };
            loginUser(data, function (err, token, user) {
                if (err) {
                    if (err.message === "Invalid Email or Password") {
                        res.status(400).send(err.message);
                    }
                    else {
                        console.log(err);
                        res.status(500).send(err);
                    }
                }
                else {
                    res.status(200).send({ token: token, user: user });
                }
            });
        }
    });
});

router.get('/:id', function (req, res, next) {
    const id = req.params.id;
    if (id) {
        getUserById(id, function (err, user) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            else {
                res.status(200).send(user);
            }
        });
    }
    else {
        res.status(400).send("id param required");
    }
});

export default router;
