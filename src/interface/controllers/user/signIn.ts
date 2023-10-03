import { Request, Response } from "express"
import signIn from "../../../useCase/userUseCase/signIn"

export default {
    signin: async (req: Request, res: Response) => {
        try {
            res.json(await signIn.validateUser(req.body))
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: (error as Error).message })
        }
    },
    googleSignup: async (req: Request, res: Response) => {
        try {
            res.json(await signIn.checkuserExists(req.body.email))
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: (error as Error).message })
        }
    }
}