import { Request, Response } from "express"
import resetPassword from "../../../useCase/driverUseCase/resetPassword"

export default {
    resetPasswordLink: async (req: Request, res: Response) => {
        try {
            console.log("called", req.body);

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
    }
}