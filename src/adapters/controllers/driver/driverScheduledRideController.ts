import { Request, Response } from "express"
import driverScheduledRideUseCase from "../../../business/useCase/driverUseCase/driverScheduledRideUseCase"


export default {

    getScheduleRideNotification: async (req: Request, res: Response) => {
        try {
            res.json(await driverScheduledRideUseCase.getNotApprovedScheduleRides())
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    confirmScheduledRide: async (req: Request, res: Response) => {
        try {
            res.json(await driverScheduledRideUseCase.driverAcceptScheduledRide(req.body, req.token.data))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    schedulePendingRides: async (req: Request, res: Response) => {
        try {
            res.json(await driverScheduledRideUseCase.getPendingScheduledRides(req.token.data))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    startScheduledRide: async (req: Request, res: Response) => {
        try {
            const rideId = req.query.id as string
            res.json(await driverScheduledRideUseCase.startScheduledRide(rideId, req.token.data))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
}