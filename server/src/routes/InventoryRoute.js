import { Router } from "express";
import { createInventory } from "./../services/InventoryService";
import { validateCreateInventory } from "./../validators/InventoryValidator"

const router = Router();

router.post('/', function (req, res, next) {
    validateCreateInventory(req.body, function (err) {
        if (err) {
            res.status(400).send(err);
        }
        else {
            const { productId, productName, mrp, batch, quantity } = req.body;
            const data = { productId, productName: { en: productName }, mrp, batch, quantity };
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