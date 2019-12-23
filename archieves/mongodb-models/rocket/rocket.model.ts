import * as mongoose from "mongoose";

const RocketSchema = new mongoose.Schema({
    id: Number,
    active: Boolean,
    stages: Number,
    boosters: Number,
    cost_per_launch: String,
    success_rate_pct: Number,
    first_flight: String,
    country: String,
    company: String,
});

const Rocket = mongoose.model("rockets", RocketSchema);
export { Rocket };
