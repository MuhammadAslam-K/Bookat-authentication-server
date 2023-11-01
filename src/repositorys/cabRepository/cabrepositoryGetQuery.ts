import { ObjectId } from "mongodb"
import CabSchema from "../../entites/cabEntites"
import { handleError } from "../../infrastructure/common/errorHandling"

export default {
    getAllTheCabs: async () => {
        try {
            return await CabSchema.find()
        } catch (error) {
            handleError(error as Error)
        }
    },

    chekCabExistsWithCabName: async (cabType: string) => {
        try {
            return await CabSchema.findOne({ cabType: cabType })
        } catch (error) {
            handleError(error as Error)
        }
    },

    getCabWithId: async (id: ObjectId) => {
        try {
            return await CabSchema.findById(id)
        } catch (error) {
            handleError(error as Error)
        }
    },
}