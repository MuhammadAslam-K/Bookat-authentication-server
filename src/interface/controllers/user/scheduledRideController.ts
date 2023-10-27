import { Request, Response } from "express"
import userScheduleRideUseCase from "../../../useCase/userUseCase/userScheduleRideUseCase"

export default {
    scheduleRide: async (req: Request, res: Response) => {
        try {
            res.json(await userScheduleRideUseCase.scheduleRide(req.body, req.token.data))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    scheduleRideHistory: async (req: Request, res: Response) => {
        try {
            res.json(await userScheduleRideUseCase.getScheduleRideHistory(req.token.data))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    scheduledRides: async (req: Request, res: Response) => {
        try {
            res.json(await userScheduleRideUseCase.getScheduledRideOfUser(req.token.data))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
}
