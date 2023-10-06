import twilio from "twilio"

const accountSid = process.env.TWILIO_ACCOUNT_SID || ""
const authToken = process.env.TWILIO_AUTH_TOKEN || ""
const verifySid = process.env.TWILIO_VERIFY_SID || ""
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
            console.log("twilio", error);
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
            console.log("verify sms", verifyResponse);
            if (verifyResponse.valid) {
                return true
            }
            else {
                return ({ message: "Invalid OTP", status: 401 })
            }
        } catch (error) {
            console.log("verify sms", error);
            throw new Error((error as Error).message)
        }
    }

}