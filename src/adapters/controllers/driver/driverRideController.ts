import { Request, Response } from "express"
import driverRideUseCase from "../../../business/useCase/driverUseCase/driverRideUseCase"

export default {
    getUserWithId: async (req: Request, res: Response) => {
        try {
            const userId = req.query.id as string
            res.json(await driverRideUseCase.getUser(userId))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    getRideHistory: async (req: Request, res: Response) => {
        try {
            res.json(await driverRideUseCase.getDriverRideHistory(req.token.data))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    currentRide: async (req: Request, res: Response) => {
        try {
            res.json(await driverRideUseCase.getCurrentRide(req.token.data))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    }

}