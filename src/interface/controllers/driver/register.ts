import { Request, Response } from "express"
import registration from "../../../useCase/driverUseCase/registration"

export default {
    signup: async (req: Request, res: Response) => {
        try {
            res.json(await registration.signup(req.body))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    }
}