import { Request, Response } from "express"
import driverDashboardUseCase from "../../../business/useCase/driverUseCase/driverDashboardUseCase"


export default {
    dashboard: async (req: Request, res: Response) => {
        try {
            res.json(await driverDashboardUseCase.dashboardInfo(req.token.data))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    getAllCabs: async (req: Request, res: Response) => {
        try {
            res.json(await driverDashboardUseCase.listAllCabs())
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
}