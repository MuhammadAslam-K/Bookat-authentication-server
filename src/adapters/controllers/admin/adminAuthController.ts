import { Request, Response } from "express"
import adminAuth from "../../../business/useCase/adminUseCase/adminAuthUseCase"


export default {
    signIn: async (req: Request, res: Response) => {
        try {
            res.json(await adminAuth.signIn(req.body))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
}