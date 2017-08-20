import mongoose from "mongoose";

const MemberSchema = mongoose.Schema({
    id: { type: Number, required: true },

    name: {
        en: { type: String, required: true },
    },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    roles: [{ type: String, required: true, enum: ["deliveryManager", "storeManager"] }],

    createdAt: { type: Date, default: new Date },
    lastModifiedAt: { type: Date, default: new Date },
});

export default mongoose.model("Member", MemberSchema);