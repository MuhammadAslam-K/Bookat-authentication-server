import { Request, Response } from "express"
import driverRideUseCase from "../../../useCase/driverUseCase/driverRideUseCase"

export default {
    getUserWithId: async (req: Request, res: Response) => {
        try {
            res.json(await driverRideUseCase.getUser(req.body.id))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    }
}