import { Request, Response } from "express"
import driverRideUseCase from "../../../useCase/driverUseCase/driverRideUseCase"

export default {
    getUserWithId: async (req: Request, res: Response) => {
        try {
            res.json(await driverRideUseCase.getUser(req.body.id))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    getRideHistory: async (req: Request, res: Response) => {
        try {
            res.json(await driverRideUseCase.getRideWithDriverId(req.token.data))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    currentRide: async (req: Request, res: Response) => {
        try {
            console.log("Called")
            res.json(await driverRideUseCase.getCurrentRide(req.token.data))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    }

}