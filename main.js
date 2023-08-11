import createWheel, { calibrateWheel, WHEEL_WIDTH } from "./wheel.js";

const options = ["50", "100", "100", "100", "100", "100"];

createWheel(options);
calibrateWheel(360 / options.length / 2);
