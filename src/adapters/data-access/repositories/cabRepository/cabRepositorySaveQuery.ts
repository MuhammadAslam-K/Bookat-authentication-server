import CabSchema from "../../models/cab-model"
import { handleError } from "../../../../business/errors/errorHandling"

export default {
    addNewCab: async (data: { cabType: string, maxPersons: string, pricePerKm: string, result: string }) => {
        try {
            console.log("repo data", data)
            const newCab = new CabSchema({
                ...data,
                price: data.pricePerKm,
                image: data.result,
            })
            return await newCab.save()
        } catch (error) {
            handleError(error as Error)
        }
    }
}