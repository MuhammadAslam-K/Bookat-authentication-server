import { Request, Response } from "express"
import vehicleUsecase from "../../../business/useCase/driverUseCase/vehicleUsecase"



export default {
    getVehicleInfo: async (req: Request, res: Response) => {
        try {
            res.json(await vehicleUsecase.getVehicleInfo(req.token.data))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    updateVehicleInfo: async (req: Request, res: Response) => {
        try {
            res.json(await vehicleUsecase.updateVehicleInfo(req.token.data, req.body))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    }
}
