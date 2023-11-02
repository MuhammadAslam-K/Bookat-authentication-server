import { Request, Response } from "express"
import userRideUseCase from "../../../business/useCase/userUseCase/userRideUseCase"



export default {
    getAllCabDetails: async (req: Request, res: Response) => {
        try {
            res.json(await userRideUseCase.getAllcabs())
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    }
}