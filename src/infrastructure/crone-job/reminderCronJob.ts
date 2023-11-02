import cron from "node-cron"
import ScheduleRideSchema from "../../entites/scheduledRideEntites";
import nodeMailer from "../email/nodeMailer";


export async function startReminderCronJob() {
    cron.schedule('*/10 * * * *', async () => {
        // Get current time
        const currentTime = new Date();

        // Calculate pickup time 10 minutes before
        const pickupTime = new Date(currentTime.getTime() + 10 * 60000);

        // Find users whose pickup time is 10 minutes away
        const rides = await ScheduleRideSchema.find({ pickUpDate: { $lte: pickupTime } }).populate("user_id");
        console.log(1);

        for (const data of rides) {
            console.log(data);
            const info = {
                to: data.user_id.email,
                subject: "Pickup Reminder",
                message: "Your pickup time is in 10 minutes. Please be ready!",
            };

            const result = await nodeMailer.rideRemainderEmail(info);
            console.log("cron job result", result);
        }
    });
}
