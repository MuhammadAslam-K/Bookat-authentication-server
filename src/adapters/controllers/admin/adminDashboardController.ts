import { Request, Response } from "express"
import adminDashboardUseCase from "../../../business/useCase/adminUseCase/adminDashboardUseCase"


export default {
    dashboard: async (req: Request, res: Response) => {
        try {
            res.json(await adminDashboardUseCase.dashboardData())
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
}