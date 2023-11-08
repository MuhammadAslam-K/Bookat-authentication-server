"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startReminderCronJob = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const scheduledRide_model_1 = __importDefault(require("../../adapters/data-access/models/scheduledRide-model"));
const nodeMailer_1 = __importDefault(require("../../adapters/external-services/email/nodeMailer"));
async function startReminderCronJob() {
    node_cron_1.default.schedule('*/10 * * * *', async () => {
        const currentTime = new Date();
        const pickupTime = new Date(currentTime.getTime() + 10 * 60000);
        const rides = await scheduledRide_model_1.default.find({ pickUpDate: { $lte: pickupTime } }).populate("user_id");
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
