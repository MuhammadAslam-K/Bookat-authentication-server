import encryptionDecryption from "../../../business/shared/utilities/encryptionDecryption";
import twilio from "../../external-services/sms/twilio";
import { Request, Response } from "express"
import passwordRest from "../../../business/useCase/userUseCase/passwordRest";

export default {
    sendOtp: async (req: Request, res: Response) => {
        try {
            res.json(await twilio.sendSMS(req.body.mobile))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    verifySMS: async (req: Request, res: Response) => {
        try {
            res.json(await twilio.verifySMS(req.body.mobile, req.body.otp))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    resetPasswordLink: async (req: Request, res: Response) => {
        try {
            res.json(await passwordRest.sendRestPasswordLink(req.body.email))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    resetpassword: async (req: Request, res: Response) => {
        try {
            res.json(await passwordRest.resetPassword(req.body))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    }
}