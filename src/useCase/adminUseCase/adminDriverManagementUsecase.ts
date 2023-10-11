import { ObjectId } from "mongoose"
import adminRepositoryGetQuerys from "../../repositorys/admin/adminRepositoryGetQuerys"
import adminRepositoryUpdateQuery from "../../repositorys/admin/adminRepositoryUpdateQuery"
import nodeMailer from "../../services/nodeMailer"

export default {
    getDrivers: async () => {
        try {
            return await adminRepositoryGetQuerys.getAllDriver()
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    blockDriver: async (driverId: ObjectId) => {
        try {
            return await adminRepositoryUpdateQuery.blockDriver(driverId)
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    getSingleDriver: async (driverId: ObjectId) => {
        try {
            return await adminRepositoryGetQuerys.getSingleDriver(driverId)
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    rejectDriverInfo: async (email: string, reason: string) => {
        try {
            const data = {
                to: email,
                subject: "Admin Rejected Your Personal Information Please Resubmit it.",
                message: reason
            }

            return await nodeMailer.sendEmail(data)
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    rejectVehicleInfo: async (email: string, reason: string) => {
        try {
            const data = {
                to: email,
                subject: "Admin Rejected Your Vehicle Information Please Resubmit it.",
                message: reason
            }
            return await nodeMailer.sendEmail(data)
        } catch (error) {
            throw new Error((error as Error).message)
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
            throw new Error((error as Error).message)
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
            throw new Error((error as Error).message)
        }
    },
}