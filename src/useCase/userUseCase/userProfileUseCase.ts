import { profileUpdate } from "../driverUseCase/driverProfileUseCase";
import userRepositoryUpdateQuery from "../../repositorys/userRepository/userRepositoryUpdateQuery";
import { ObjectId } from "mongoose";
import userRepositoryGetQuery from "../../repositorys/userRepository/userRepositoryGetQuery";
import { IUser } from "../../entites/userEntites";
import { handleError } from "../../infrastructure/common/errorHandling";


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