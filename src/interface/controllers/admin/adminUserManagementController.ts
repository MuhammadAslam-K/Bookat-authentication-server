import { Request, Response } from "express"
import adminUserManagementUseCase from "../../../useCase/adminUseCase/adminUserManagementUseCase"




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
            res.json(await adminUserManagementUseCase.blockUser(req.body.id))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    }
}