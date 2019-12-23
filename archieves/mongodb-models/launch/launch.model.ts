import * as mongoose from "mongoose";

const LaunchSchema = new mongoose.Schema({
    flight_number: Number,
    launch_year: Number,
    mission_name: String,
    launch_success: Boolean,
});

const Launch = mongoose.model("launches", LaunchSchema);
export { Launch };
