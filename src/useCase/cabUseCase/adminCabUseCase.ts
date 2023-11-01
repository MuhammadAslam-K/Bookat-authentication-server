import { ObjectId } from "mongodb"
import { handleError } from "../../infrastructure/common/errorHandling"
import cabRepositoryUpdateQuery from "../../repositorys/cabRepository/cabRepositorySaveQuery"
import cabrepositoryGetQuery from "../../repositorys/cabRepository/cabrepositoryGetQuery"
import mongoose from "mongoose"

export default {

    listAllTheCabs: async () => {
        try {
            return cabrepositoryGetQuery.getAllTheCabs()
        } catch (error) {
            handleError(error as Error)
        }
    },

    addNewCab: async (data: { cabType: string, maxPersons: string, pricePerKm: string, result: string }) => {
        try {
            const cabTypeLower = data.cabType.toLowerCase()
            data.cabType = cabTypeLower
            const checkCabExists = await cabrepositoryGetQuery.chekCabExistsWithCabName(data.cabType)

            if (checkCabExists) {
                throw new Error("The Cab Type Already Exists");
            } else {
                console.log("usecase :", data)
                return await cabRepositoryUpdateQuery.addNewCab(data)
            }
        } catch (error) {
            handleError(error as Error)
        }
    },

    getTheCarWithId: async (id: string) => {
        try {
            const carId = new mongoose.Types.ObjectId(id);
            return await cabrepositoryGetQuery.getCabWithId(carId)
        } catch (error) {
            handleError(error as Error)
        }
    }
}