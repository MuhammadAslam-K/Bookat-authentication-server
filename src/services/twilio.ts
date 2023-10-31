import twilio from "twilio"

import dotenv from "dotenv";
dotenv.config();


const accountSid = process.env.TWILIO_ACCOUNT_SID
// const accountSid = "AC27fb374a44e424ecfde5a06eaba2dcbe"
const authToken = process.env.TWILIO_AUTH_TOKEN
// const authToken = "c941a2b0397c6559b625376082388bbb"
const verifySid = process.env.TWILIO_VERIFY_SID
// const verifySid = "VA36b0a90b67572c230c2b3798c0e8048b"
const client = twilio(accountSid, authToken)

export default {
    sendSMS: async (mobile: string) => {

        return true
        // const countryCode = 91;
        // if (verifySid) {


        //     try {
        //         await client.verify.v2
        //             .services(verifySid)
        //             .verifications.create({
        //                 to: `+${countryCode}${mobile}`,
        //                 channel: "sms",
        //             });
        //         return true
        //     } catch (error) {
        //         console.log("Error in sending SMS ", error);
        //         throw new Error((error as Error).message)
        //     }
        // }
    },

    verifySMS: async (mobile: string, otp: string) => {

        return true
        // if (verifySid) {

        //     const countryCode = 91;
        //     try {
        //         const verifyResponse = await client.verify.v2
        //             .services(verifySid)
        //             .verificationChecks.create({
        //                 to: `+${countryCode}${mobile}`,
        //                 code: otp,
        //             });

        //         if (verifyResponse.valid) {
        //             return true
        //         }
        //         else {
        //             return ({ message: "Invalid OTP", status: 401 })
        //         }
        //     } catch (error) {
        //         console.log("Error in verifying SMS ", error);
        //         throw new Error((error as Error).message)
        //     }
        // }
    }

}