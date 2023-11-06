"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startReminderCronJob = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const scheduledRideEntites_1 = __importDefault(require("../../adapters/data-access/models/scheduledRideEntites"));
const nodeMailer_1 = __importDefault(require("../../adapters/external-services/email/nodeMailer"));
async function startReminderCronJob() {
    node_cron_1.default.schedule('*/10 * * * *', async () => {
        // Get current time
        const currentTime = new Date();
        // Calculate pickup time 10 minutes before
        const pickupTime = new Date(currentTime.getTime() + 10 * 60000);
        // Find users whose pickup time is 10 minutes away
        const rides = await scheduledRideEntites_1.default.find({ pickUpDate: { $lte: pickupTime } }).populate("user_id");
        console.log(1);
        for (const data of rides) {
            console.log(data);
            const info = {
                to: data.user_id.email,
                subject: "Pickup Reminder",
                message: "Your pickup time is in 10 minutes. Please be ready!",
            };
            const result = await nodeMailer_1.default.rideRemainderEmail(info);
            console.log("cron job result", result);
        }
    });
}
exports.startReminderCronJob = startReminderCronJob;
