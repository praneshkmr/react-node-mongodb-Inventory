import { Router } from "express";
import { createUser, getUserById, loginUser } from "./../services/UserService";

const router = Router();

router.post('/', function (req, res, next) {
    const data = req.body;
    createUser(data, function (err, user) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        else {
            res.status(201).send(user);
        }
    });
});

router.post('/login', function (req, res, next) {
    const data = req.body;
    loginUser(data, function (err, user, token) {
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
