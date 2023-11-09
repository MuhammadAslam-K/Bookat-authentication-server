import cron from "node-cron"
import ScheduleRideSchema from "../../adapters/data-access/models/scheduledRide-model";
import nodeMailer from "../../adapters/external-services/email/nodeMailer";


export async function startReminderCronJob() {
    cron.schedule('*/10 * * * *', async () => {

        const currentTime = new Date();


        const pickupTime = new Date(currentTime.getTime() + 10 * 60000);


        const rides = await ScheduleRideSchema.find({ pickUpDate: { $lte: pickupTime } }).populate("user_id");

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
