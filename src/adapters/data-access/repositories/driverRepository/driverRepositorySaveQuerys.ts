import DriverSchema from "../../models/driver-model"
import { signupData } from "../../../../business/useCase/userUseCase/userRegistrationUseCase"

export default {
    saveDriver: async (data: signupData, refferalCode: string) => {
        try {
            const driver = new DriverSchema({
                ...data,
                refrel: refferalCode
            })
            return await driver.save()
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
}