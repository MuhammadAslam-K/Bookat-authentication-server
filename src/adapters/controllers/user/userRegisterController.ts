import { Request, Response } from "express"
import registration from "../../../business/useCase/userUseCase/userRegistrationUseCase"


export default {
    signup: async (req: Request, res: Response) => {
        try {
            res.json(await registration.registerUser(req.body))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    googleSignup: async (req: Request, res: Response) => {
        try {
            const data = {
                name: req.body.displayName,
                email: req.body.email,
            }
            res.json(await registration.googleSignUp(data))

        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    checkUserExists: async (req: Request, res: Response) => {
        try {
            res.json(await registration.checkUserExists(req.body))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
}