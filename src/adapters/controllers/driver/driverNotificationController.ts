import { Request, Response } from "express"
import resetPassword from "../../../business/useCase/driverUseCase/resetPassword"
import driverNotificationUseCase from "../../../business/useCase/driverUseCase/driverNotificationUseCase"

export default {
    resetPasswordLink: async (req: Request, res: Response) => {
        try {
            res.json(await resetPassword.sendRestPasswordLink(req.body.email))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    resetpassword: async (req: Request, res: Response) => {
        try {
            res.json(await resetPassword.resetPassword(req.body))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    verifyOTP: async (req: Request, res: Response) => {
        try {
            res.json(await driverNotificationUseCase.verifyotp(req.body))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    }
}