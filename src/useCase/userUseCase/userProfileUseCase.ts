import { profileUpdate } from "../driverUseCase/driverProfileUseCase";
import userRepositoryUpdateQuery from "../../repositorys/userRepository/userRepositoryUpdateQuery";
import { ObjectId } from "mongoose";
import userRepositoryGetQuery from "../../repositorys/userRepository/userRepositoryGetQuery";
import { IUser } from "../../entites/userEntites";


export default {

    updateProfile: async (data: profileUpdate, userId: ObjectId) => {
        try {
            return await userRepositoryUpdateQuery.updateUserProfile(data, userId);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },

    getProfile: async (userID: ObjectId) => {
        try {
            return await userRepositoryGetQuery.getUserWithId(userID)
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
}






// import { profileUpdate } from "../driverUseCase/driverProfileUseCase";
// import userRepositoryUpdateQuery from "../../repositorys/userRepository/userRepositoryUpdateQuery";
// import { IUser } from "../../entites/userEntites";
// import { ObjectId } from "mongoose";
// import userRepositoryGetQuery from "../../repositorys/userRepository/userRepositoryGetQuery";

// interface UserRepository {
//     getUserWithId: (userId: ObjectId) => Promise<IUser | null>;
// }

// interface UserProfileUseCase {
//     getProfile: (userId: ObjectId) => Promise<IUser | null>;
// }

// const userProfileUseCase: UserProfileUseCase = {
//     getProfile: async (userId: ObjectId) => {
//         try {
//             return await userRepositoryGetQuery.getUserWithId(userId);
//         } catch (error) {
//             throw new Error((error as Error).message);
//         }
//     },


// };

// export default userProfileUseCase;