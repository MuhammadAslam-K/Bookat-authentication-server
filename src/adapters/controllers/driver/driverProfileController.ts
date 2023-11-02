import { Request, Response } from "express"
import driverProfileUseCase from "../../../business/useCase/driverUseCase/driverProfileUseCase"
import driverRepositoryUpdateQuerys from "../../data-access/repositories/driverRepository/driverRepositoryUpdateQuerys"

export default {
    getDriverProfile: async (req: Request, res: Response) => {
        try {
            res.json(await driverProfileUseCase.getDriverProfile(req.token.data))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    driverAvailable: async (req: Request, res: Response) => {
        try {
            res.json(await driverRepositoryUpdateQuerys.changeDriverAvailablety(req.token.data))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    updateDriverProfile: async (req: Request, res: Response) => {
        try {
            res.json(await driverProfileUseCase.updateProfile(req.body, req.token.data))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

}