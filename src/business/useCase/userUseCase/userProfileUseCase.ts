import { profileUpdate } from "../driverUseCase/driverProfileUseCase";
import userRepositoryUpdateQuery from "../../../adapters/data-access/repositories/userRepository/userRepositoryUpdateQuery";
import { ObjectId } from "mongoose";
import userRepositoryGetQuery from "../../../adapters/data-access/repositories/userRepository/userRepositoryGetQuery";
import { IUser } from "../../../adapters/data-access/models/user-model";
import { handleError } from "../../errors/errorHandling";


export default {

    updateProfile: async (data: profileUpdate, userId: ObjectId) => {
        try {
            return await userRepositoryUpdateQuery.updateUserProfile(data, userId);
        } catch (error) {
            handleError(error as Error)
        }
    },

    getProfile: async (userID: string) => {
        try {
            return await userRepositoryGetQuery.getUserWithId(userID)
        } catch (error) {
            handleError(error as Error)
        }
    },
}