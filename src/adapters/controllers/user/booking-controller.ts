import { Request, Response } from "express"
import userRideUseCase from "../../../business/useCase/userUseCase/userRideUseCase"

export default {
    payment: async (req: Request, res: Response) => {
        try {
            res.json(await userRideUseCase.payment(req.body, req.token.data))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    review: async (req: Request, res: Response) => {
        try {
            console.log("data", req.body)
            res.json(await userRideUseCase.submitReview(req.body))
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: (error as Error).message })
        }
    },
}