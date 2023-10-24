import { Request, Response } from "express"
import driverScheduledRideUseCase from "../../../useCase/driverUseCase/driverScheduledRideUseCase"


export default {
    getscheduleRideHistory: async (req: Request, res: Response) => {
        try {
            res.json(await driverScheduledRideUseCase.getScheduledRideHistoryByDriverId(req.token.data))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    getScheduleRideNotification: async (req: Request, res: Response) => {
        try {
            res.json(await driverScheduledRideUseCase.getNotApprovedScheduleRides())
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    confirmScheduledRide: async (req: Request, res: Response) => {
        try {
            res.json(await driverScheduledRideUseCase.driverAcceptScheduledRide(req.body.rideId, req.token.data))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    }
}