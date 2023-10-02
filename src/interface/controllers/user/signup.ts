import { Request, Response } from "express"
import registration from "../../../useCase/userUseCase/registration"

export default {
    signup: async (req: Request, res: Response) => {
        try {
            res.json(await registration.register(req.body))

        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
    googleSignup: async (req: Request, res: Response) => {
        try {
            const data = {
                userName: req.body.displayName,
                email: req.body.email,
            }
            res.json(await registration.googleSignUp(data))

        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    }
}