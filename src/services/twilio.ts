import twilio from "twilio"

import dotenv from "dotenv";
dotenv.config();


// const accountSid = process.env.TWILIO_ACCOUNT_SID
const accountSid = "AC27fb374a44e424ecfde5a06eaba2dcbe"
// const authToken = process.env.TWILIO_AUTH_TOKEN
const authToken = "7aa06a1bdcf3ec95c1061aa51c2f3226"
// const verifySid = process.env.TWILIO_VERIFY_SID || ""
const verifySid = "VA36b0a90b67572c230c2b3798c0e8048b"
const client = twilio(accountSid, authToken)

export default {
    sendSMS: async (mobile: string) => {

        const countryCode = 91;
        try {
            await client.verify.v2
                .services(verifySid)
                .verifications.create({
                    to: `+${countryCode}${mobile}`,
                    channel: "sms",
                });
            return true
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    verifySMS: async (mobile: string, otp: string) => {

        const countryCode = 91;
        try {
            const verifyResponse = await client.verify.v2
                .services(verifySid)
                .verificationChecks.create({
                    to: `+${countryCode}${mobile}`,
                    code: otp,
                });

            if (verifyResponse.valid) {
                return true
            }
            else {
                return ({ message: "Invalid OTP", status: 401 })
            }
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }

}