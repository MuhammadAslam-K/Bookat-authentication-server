import mongoose from "mongoose"
import { ObjectId } from "mongodb"
import adminRepositoryGetQuerys from "../../repositorys/admin/adminRepositoryGetQuerys"
import adminRepositoryUpdateQuery from "../../repositorys/admin/adminRepositoryUpdateQuery"
import nodeMailer from "../../infrastructure/email/nodeMailer"
import rideRepositoryGetQuery from "../../repositorys/rideRepository/rideRepositoryGetQuery"
import scheduleRideGetQuery from "../../repositorys/scheduleRide/scheduleRideGetQuery"
import driverRepositoryUpdateQuerys from "../../repositorys/driverRepository/driverRepositoryUpdateQuerys"
import { handleError } from "../../infrastructure/common/errorHandling"
import driverRepositoryGetQuerys from "../../repositorys/driverRepository/driverRepositoryGetQuerys"

export default {
    getDrivers: async () => {
        try {
            return await adminRepositoryGetQuerys.getAllDriver()
        } catch (error) {
            handleError(error as Error)
        }
    },

    blockDriver: async (driverId: string) => {
        try {
            // const driverId = new mongoose.Types.ObjectId(driver);
            return await adminRepositoryUpdateQuery.blockDriver(driverId)
        } catch (error) {
            console.log(error)
            handleError(error as Error)
        }
    },

    getSingleDriver: async (driverId: string) => {
        try {
            return driverRepositoryGetQuerys.findDriverWithId(driverId)
        } catch (error) {
            handleError(error as Error)
        }
    },

    rejectDriverInfo: async (email: string, id: ObjectId, reason: string) => {
        try {
            await adminRepositoryUpdateQuery.rejectPersonalInfo(id)
            const data = {
                to: email,
                subject: "Admin Rejected Your Personal Information Please Resubmit it.",
                message: reason
            }

            return await nodeMailer.sendEmail(data)
        } catch (error) {
            handleError(error as Error)
        }
    },

    rejectVehicleInfo: async (email: string, id: ObjectId, reason: string) => {
        try {
            await adminRepositoryUpdateQuery.rejectVehicleInfo(id)
            const data = {
                to: email,
                subject: "Admin Rejected Your Vehicle Information Please Resubmit it.",
                message: reason
            }
            return await nodeMailer.sendEmail(data)
        } catch (error) {
            handleError(error as Error)
        }
    },

    approveDriverInfo: async (driverId: ObjectId, email: string) => {
        try {
            const data = {
                to: email,
                subject: "Admin Approved Your Information.",
                message: "Your personal information had been verifyed and Approved"
            }
            await nodeMailer.sendEmail(data)
            await adminRepositoryUpdateQuery.approveDriverInfo(driverId)
            return true
        } catch (error) {
            handleError(error as Error)
        }
    },

    approveVehicleInfo: async (driverId: ObjectId, email: string) => {
        try {
            const data = {
                to: email,
                subject: "Admin Approved Your Information.",
                message: "Your Vehicle information had been verifyed and Approved"
            }
            await nodeMailer.sendEmail(data)
            await adminRepositoryUpdateQuery.approveVehicleInfo(driverId)
            return true
        } catch (error) {
            handleError(error as Error)
        }
    },


    getDriverRideHistory: async (driverId: string) => {
        try {
            const [quickRides, scheduleRides] = await Promise.all([
                rideRepositoryGetQuery.getRidesWithDriverId(driverId),
                scheduleRideGetQuery.getScheduledRidesWithDriverId(driverId),
            ])
            return { quickRides, scheduleRides }
        } catch (error) {
            handleError(error as Error);

        }
    }
}