import { Request, Response } from "express"
import userRideUseCase from "../../../useCase/userUseCase/userRideUseCase"
import { ObjectId } from "mongoose"
import mongoose from "mongoose";
import { handleError } from "../../../infrastructure/common/errorHandling";

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
            const rideId = req.query.id as string
            res.json(await userRideUseCase.getRideDetails(rideId))
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

    favouriteRide: async (req: Request, res: Response) => {
        try {
            const rideId = req.query.id as string
            res.json(await userRideUseCase.addFavouriteRide(rideId))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    getQuickRideInfo: async (req: Request, res: Response) => {
        try {
            const rideId = req.query.id as string
            res.json(await userRideUseCase.getRideInfoWithID(rideId))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    }

}