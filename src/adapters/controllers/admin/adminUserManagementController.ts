import { Request, Response } from "express"
import adminUserManagementUseCase from "../../../business/useCase/adminUseCase/adminUserManagementUseCase"


export default {

    getuser: async (req: Request, res: Response) => {
        try {
            res.json(await adminUserManagementUseCase.getUsers())
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    blockUser: async (req: Request, res: Response) => {
        try {
            const userId = req.query.id as string;
            res.json(await adminUserManagementUseCase.blockUser(userId))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },


    getUserRideHistory: async (req: Request, res: Response) => {
        try {
            const userId = req.query.id as string
            res.json(await adminUserManagementUseCase.getRideHistoryWithUserId(userId))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    }
}