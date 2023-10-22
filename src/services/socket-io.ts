import { Server as SocketIOServer, Socket } from "socket.io";
import { calculateDistance } from "./socket-ioHelper";
import driverRideUseCase from "../useCase/driverUseCase/driverRideUseCase";

interface DriverData {
    latitude: string;
    longitude: string;
    driverId: string;
    vehicleType: string;
}

// / / / / /USER / / / / /
let userLat: string
let userLon: string
let userVehicleType: string
let userId: string
let userFromLocation: string
let userToLocation: string
let amount: string
let rideDistance: string
let fromLocationLat: string
let fromLocationLong: string
let toLocationLat: string
let toLocationLong: string

// / / / / /DRIVER / / / / / 
let driverLatitude: string
let driverLongitude: string
let driverId: string
let driverVehicleType: string

export const setUpSocketIO = (): void => {
    const io: SocketIOServer = new SocketIOServer(8000, {
        cors: {
            origin: "*",
            credentials: true
        },
    });




    io.on('connect', (socket: Socket) => {


        console.log('connected:', socket.id);

        socket.on("confirmRide", (data: any) => {
            console.log("ride confirm", data)

            userLat = data.latitude
            userLon = data.longitude
            userVehicleType = data.vehicle
            userId = data.userId
            userFromLocation = data.fromLocation
            userToLocation = data.toLocation
            amount = data.amount
            rideDistance = data.distance
            fromLocationLat = data.fromLocationLat
            fromLocationLong = data.fromLocationLong
            toLocationLat = data.toLocationLat
            toLocationLong = data.toLocationLong
            console.log("vehicle type confirmRide ", userVehicleType)
            io.emit("driverlocationUpdate")
        })



        let nearbyDriver: { distance: number; driverId: string; userId: string; rideDistance: string; userFromLocation: string; userToLocation: string; amount: string; }[] = []
        const processedDriverIds = new Set<string | undefined>();
        socket.on('getdriverlocationUpdate', (data: DriverData) => {
            console.log(`Location update from driver (${socket.id}):`, data);
            driverLatitude = data.latitude
            driverLongitude = data.longitude
            driverId = data.driverId
            driverVehicleType = data.vehicleType

            const distance = calculateDistance(
                parseFloat(userLat),
                parseFloat(userLon),
                userVehicleType,
                parseFloat(driverLatitude),
                parseFloat(driverLongitude),
                driverVehicleType,
            );

            console.log("distance :", distance, userVehicleType)
            if (distance >= -10 && !processedDriverIds.has(driverId)) {
                const data = { distance, driverId, userId, rideDistance, userFromLocation, userToLocation, amount }
                console.log("driver push data :", data)
                nearbyDriver.push(data)
                processedDriverIds.add(driverId)
            }
        });

        // Emit nearby drivers one by one at regular intervals
        const emitNearbyDrivers = () => {
            if (nearbyDriver.length > 0) {
                const driverData = nearbyDriver.shift();
                console.log("driver data", driverData)
                io.emit('getDriverConfirmation', driverData);
                processedDriverIds.delete(driverData?.driverId);
            }
        };

        socket.on("rejectedRide", (data) => {
            console.log("Driver Rejected Ride")
            emitNearbyDrivers()
        })

        socket.on("approveRide", async (data) => {
            console.log("Driver approved the ride", data)
            nearbyDriver = []
            processedDriverIds.clear()
            // const rideDetails = { userLat, userLon, userId, driverLatitude, driverLongitude, driverId }
            const value = {
                toLocationLat,
                toLocationLong,
                fromLocationLat,
                fromLocationLong,
                userFromLocation,
                userToLocation,
                driverLatitude,
                driverLongitude,
                rideDistance,
                amount,
                userId,
                driverId
            }
            const rideId = await driverRideUseCase.saveNewRide(value)
            console.log("ride save id", rideId)
            const values = {
                driverId,
                userId,
                rideId,
            }
            io.emit("sendRideDetails", values)
        })

        socket.on("userCancelRide", (data) => {
            console.log("user Cancelled the ride")
            processedDriverIds.clear()
            nearbyDriver = []
        })
        const interval = setInterval(emitNearbyDrivers, 15000);

        socket.on("updateDriverLocationToUser", (data) => {
            console.log("Update Driver Location To User", data)

            io.emit("driverUpdatedLocationToUser", data)
        })

        socket.on("startRide", (data) => {
            console.log("startRide", data)
            io.emit("startRideNotifyUser", data)
        })

        socket.on("endRide", (data) => {
            console.log("End Ride", data)
            io.emit("endRideNotifyUser", data)
        })

    });

    io.on('error', (error) => {
        console.error('Socket.IO error:', error);
    });
};
