import { Request, Response } from "express"
import registration from "../../../useCase/driverUseCase/driverAuthUseCase"
import driverRegistrationUsecase from "../../../useCase/driverUseCase/driverRegistrationUsecase"

export default {
    signup: async (req: Request, res: Response) => {
        try {
            res.json(await registration.signup(req.body))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
    login: async (req: Request, res: Response) => {
        try {
            res.json(await registration.login(req.body));
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
    saveDriverInfo: async (req: Request, res: Response) => {
        try {
            res.json(await driverRegistrationUsecase.saveDriverInfo(req.body, req.token.userId))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
    saveVehicleInfo: async (req: Request, res: Response) => {
        try {
            res.json(await driverRegistrationUsecase.saveVehicleInfo(req.body, req.token.userId))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
}