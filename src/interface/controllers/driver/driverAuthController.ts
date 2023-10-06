import { Request, Response } from "express"
import driverAuthUseCase from "../../../useCase/driverUseCase/driverAuthUseCase"
import driverRegistrationUsecase from "../../../useCase/driverUseCase/driverRegistrationUsecase"

export default {
    signup: async (req: Request, res: Response) => {
        try {
            res.json(await driverAuthUseCase.signup(req.body))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
    login: async (req: Request, res: Response) => {
        try {
            res.json(await driverAuthUseCase.login(req.body));
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
    saveDriverInfo: async (req: Request, res: Response) => {
        try {
            res.json(await driverRegistrationUsecase.saveDriverInfo(req.body, req.token.payload))
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: (error as Error).message })
        }
    },
    saveVehicleInfo: async (req: Request, res: Response) => {
        try {
            res.json(await driverRegistrationUsecase.saveVehicleInfo(req.body, req.token.payload))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    checkExists: async (req: Request, res: Response) => {
        try {
            console.log(req.body);

            res.json(await driverAuthUseCase.checkDriverExists(req.body))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
}