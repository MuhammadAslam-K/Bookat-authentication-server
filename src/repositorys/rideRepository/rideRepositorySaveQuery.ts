import RideSchema from "../../entites/rideEntites"


interface rideData {
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

            })
            return await newRide.save()
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}



// [1] data in usecase {
//     [1]   toLocationLat: 13.083694,
//     [1]   toLocationLong: 80.270186,
//     [1]   fromLocationLat: 12.992112,
//     [1]   fromLocationLong: 77.588446,
//     [1]   userFromLocation: 'Bengaluru, Karnataka, India',
//     [1]   userToLocation: 'Chennai, Tamil Nadu, India',
//     [1]   driverLatitude: 12.9003968,
//     [1]   driverLongitude: 77.6507902,
//     [1]   rideDistance: '291',
//     [1]   amount: '29069'
// userId,
// driverId
//     [1] }