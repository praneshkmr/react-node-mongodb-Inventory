import mongoose from "mongoose";

const InventorySchema = mongoose.Schema({
    id: { type: Number, required: true },

    productId: { type: Number, required: true },
    name: {
        en: { type: String, required: true },
    },
    mrp: { type: Number, required: true },
    batch: {
        number: { type: Number, required: true },
        date: { type: Date, default: new Date },
    },
    quantity: { type: Number, required: true },
    status: { type: String, required: true, enum: ["approved", "pending"] },

    createdAt: { type: Date, default: new Date },
    lastModifiedAt: { type: Date, default: new Date },
});

export default mongoose.model("Inventory", InventorySchema);