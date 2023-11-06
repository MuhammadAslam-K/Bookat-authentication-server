import { Request, Response } from "express"
import userProfileUseCase from "../../../business/useCase/userUseCase/userProfileUseCase"

export default {
    getProfile: async (req: Request, res: Response) => {
        try {
            res.json(await userProfileUseCase.getProfile(req.token.data))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    updateProfile: async (req: Request, res: Response) => {
        try {
            res.json(await userProfileUseCase.updateProfile(req.body, req.token.data))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
}