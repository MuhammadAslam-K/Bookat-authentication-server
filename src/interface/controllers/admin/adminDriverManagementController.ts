import { Request, Response } from "express"
import adminDriverManagementUsecase from "../../../useCase/adminUseCase/adminDriverManagementUsecase"


export default {
    getDrivers: async (req: Request, res: Response) => {
        try {
            res.json(await adminDriverManagementUsecase.getDrivers())
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    blockDriver: async (req: Request, res: Response) => {
        try {
            const driverId = req.query.id as string
            res.json(await adminDriverManagementUsecase.blockDriver(driverId))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    getSingleDriver: async (req: Request, res: Response) => {
        try {
            if (typeof (req.query.id) === 'string') {
                res.json(await adminDriverManagementUsecase.getSingleDriver(req.query.id))
            }
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    rejectDriver: async (req: Request, res: Response) => {
        try {
            res.json(await adminDriverManagementUsecase.rejectDriverInfo(req.body.email, req.body.id, req.body.reason))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    rejectVehicle: async (req: Request, res: Response) => {
        try {
            res.json(await adminDriverManagementUsecase.rejectVehicleInfo(req.body.email, req.body.id, req.body.reason))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    approveDriver: async (req: Request, res: Response) => {
        try {
            res.json(await adminDriverManagementUsecase.approveDriverInfo(req.body.id, req.body.email))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    approveVehicle: async (req: Request, res: Response) => {
        try {
            res.json(await adminDriverManagementUsecase.approveVehicleInfo(req.body.id, req.body.email))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },


    getDriverRideHistory: async (req: Request, res: Response) => {
        try {
            res.json(await adminDriverManagementUsecase.getDriverRideHistory(req.body.driverId))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
}