import mongoose from "mongoose";

const CounterSchema = mongoose.Schema({
    type: { type: String, required: true },
    counter: { type: Number, required: true, default: 0 }
});

export default mongoose.model("Counter", CounterSchema);