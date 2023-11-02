import { Request, Response } from "express"
import signIn from "../../../business/useCase/userUseCase/userSignInUseCase"

export default {
    signin: async (req: Request, res: Response) => {
        try {
            res.json(await signIn.validateUser(req.body))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
    googleSignin: async (req: Request, res: Response) => {
        try {
            res.json(await signIn.checkuserExists(req.body.email));
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
}