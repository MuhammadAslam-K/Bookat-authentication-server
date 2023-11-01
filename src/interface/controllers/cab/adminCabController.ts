import { Request, Response } from "express"
import adminCabUseCase from "../../../useCase/cabUseCase/adminCabUseCase"


export default {
    showCabs: async (req: Request, res: Response) => {
        try {
            res.json(await adminCabUseCase.listAllTheCabs())
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    addNewCab: async (req: Request, res: Response) => {
        try {
            res.json(await adminCabUseCase.addNewCab(req.body))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    getcar: async (req: Request, res: Response) => {
        try {
            res.json(await adminCabUseCase.getTheCarWithId(req.params.id));
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    },

}