import DriverSchema from "../../entites/driverEntites"
import { driverInfo } from "../../useCase/driverUseCase/driverRegistrationUsecase"
import { signupData } from "../../useCase/userUseCase/userRegistrationUseCase"

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