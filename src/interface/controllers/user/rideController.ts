import { Request, Response } from "express"
import userRideUseCase from "../../../useCase/userUseCase/userRideUseCase"


export default {
    getDriverData: async (req: Request, res: Response) => {
        try {
            res.json(await userRideUseCase.getDriverById(req.body.driverId))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    getRideData: async (req: Request, res: Response) => {
        try {
            res.json(await userRideUseCase.getRideDetails(req.body.rideId))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    payment: async (req: Request, res: Response) => {
        try {
            res.json(await userRideUseCase.payment(req.body, req.token.data))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    rides: async (req: Request, res: Response) => {
        try {
            res.json(await userRideUseCase.rides(req.token.data))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    currentRide: async (req: Request, res: Response) => {
        try {
            res.json(await userRideUseCase.getCurrentRide(req.token.data))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    }

}