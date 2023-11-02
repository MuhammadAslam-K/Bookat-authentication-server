import { handleError } from "../../../../business/errors/errorHandling"
import CabSchema from "../../models/cab-model"
import { ObjectId } from "mongoose"

export default {
    updateCabArray: async (vehicleType: string, driverId: ObjectId) => {
        try {
            console.log(driverId)
            return await CabSchema.findOneAndUpdate(
                { cabType: vehicleType },
                {
                    $addToSet: {
                        drivers: driverId
                    }
                },
                { new: true }
            );
        } catch (error) {
            handleError(error as Error)
        }
    },

    removeDriverId: async (vehicleType: string, driverId: ObjectId) => {
        try {
            console.log(driverId, vehicleType)
            return await CabSchema.findOneAndUpdate(
                { cabType: vehicleType },
                { $pull: { drivers: driverId } },
                { new: true }
            )
        } catch (error) {
            handleError(error as Error)
        }
    }
}