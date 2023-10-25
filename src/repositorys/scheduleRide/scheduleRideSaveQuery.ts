import { ObjectId } from "mongoose";
import { scheduleRideBookingData } from "../../useCase/userUseCase/userScheduleRideUseCase";
import ScheduleRideSchema from "../../entites/scheduledRideEntites";


export default {
    saveNewRide: async (data: scheduleRideBookingData, userId: ObjectId) => {
        try {
            const ride = new ScheduleRideSchema({
                user_id: userId,
                price: data.amount,
                vehicleType: data.vehicle,
                'pickupCoordinates.latitude': data.fromLocationLat,
                'pickupCoordinates.longitude': data.fromLocationLong,
                'dropoffCoordinates.latitude': data.toLocationLat,
                'dropoffCoordinates.longitude': data.toLocationLong,
                pickupLocation: data.fromLocation,
                dropoffLocation: data.toLocation,
                distance: data.distance,
                pickUpDate: data.selectedDateTime,
                duration: data.duration
            })
            await ride.save()
            return true
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}