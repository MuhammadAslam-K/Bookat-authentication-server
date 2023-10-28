import { Request, Response } from "express"
import userRideUseCase from "../../../useCase/userUseCase/userRideUseCase"
import { ObjectId } from "mongoose"
import mongoose from "mongoose";

export default {
    getDriverDetails: async (req: Request, res: Response) => {
        try {
            if (typeof req.query.driverId === "string") {
                res.json(await userRideUseCase.getDriverDetailsAndFeedbacks(req.query.driverId))
            } else {
                res.status(400).json({ error: "Invalid driverId parameter" });
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: (error as Error).message })
        }
    },

    getRideData: async (req: Request, res: Response) => {
        try {
            res.json(await userRideUseCase.getRideDetails(req.body.rideId))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    payment: async (req: Request, res: Response) => {
        try {
            res.json(await userRideUseCase.payment(req.body, req.token.data))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    ridesHistory: async (req: Request, res: Response) => {
        try {
            res.json(await userRideUseCase.getUserRidesHistory(req.token.data))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    currentRide: async (req: Request, res: Response) => {
        try {
            res.json(await userRideUseCase.getCurrentRide(req.token.data))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

}