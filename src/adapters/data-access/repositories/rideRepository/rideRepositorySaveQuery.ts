import RideSchema from "../../models/quickRide-model"


export interface rideData {
    driverId: any;
    userId: any;
    fromLocationLat: any;
    fromLocationLong: any;
    toLocationLat: any;
    toLocationLong: any;
    userFromLocation: any;
    userToLocation: any;
    driverLatitude: any;
    driverLongitude: any;
    rideDistance: any;
    userVehicleType: string
    amount: any
}

export default {
    saveRideInfo: async (data: rideData) => {
        try {
            const newRide = new RideSchema({
                driver_id: data.driverId,
                user_id: data.userId,
                pickupCoordinates: {
                    latitude: data.fromLocationLat,
                    longitude: data.fromLocationLong
                },
                dropoffCoordinates: {
                    latitude: data.toLocationLat,
                    longitude: data.toLocationLong
                },
                pickupLocation: data.userFromLocation,
                dropoffLocation: data.userToLocation,
                driverCoordinates: {
                    latitude: data.driverLatitude,
                    longitude: data.driverLongitude
                },
                distance: data.rideDistance,
                price: data.amount,
                vehicleType: data.userVehicleType,

            })
            return await newRide.save()
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}