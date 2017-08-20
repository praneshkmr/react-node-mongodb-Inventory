import { Router } from "express";
import { createUser, getUserById } from "./../services/UserService";

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
