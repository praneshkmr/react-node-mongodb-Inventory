import { Router } from "express";
import { createInventory } from "./../services/InventoryService";
import { validateCreateInventory } from "./../validators/InventoryValidator"
import { verifyAuthMiddleware } from "./../utils/AuthUtil";

const router = Router();

router.post('/', verifyAuthMiddleware, function (req, res, next) {
    validateCreateInventory(req.body, function (err) {
        if (err) {
            res.status(400).send(err);
        }
        else {
            const userSession = req.session;
            const { productId, productName, mrp, batch, quantity } = req.body;
            const data = { productId, productName: { en: productName }, mrp, batch, quantity, userSession };
            createInventory(data, function (err, inventory) {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                }
                else {
                    res.status(201).send(inventory);
                }
            });
        }
    });
});

export default router;