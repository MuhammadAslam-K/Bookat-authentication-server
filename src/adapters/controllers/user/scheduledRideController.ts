import { Request, Response } from "express"
import userScheduleRideUseCase from "../../../business/useCase/userUseCase/userScheduleRideUseCase"

export default {
    scheduleNewRide: async (req: Request, res: Response) => {
        try {
            res.json(await userScheduleRideUseCase.scheduleRide(req.body, req.token.data))
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


    cancelride: async (req: Request, res: Response) => {
        try {
            res.json(await userScheduleRideUseCase.cancelTheRide(req.body, req.token.data))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    reScheduleTheRide: async (req: Request, res: Response) => {
        try {
            res.json(await userScheduleRideUseCase.reScheduleRideWithRideId(req.body))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    }
}
