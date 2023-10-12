import { vehicleInfo } from './driverRegistrationUsecase';
import { ObjectId } from "mongoose";
import driverRepositoryGetQuerys from "../../repositorys/driverRepository/driverRepositoryGetQuerys";
import driverRepositoryUpdateQuerys from '../../repositorys/driverRepository/driverRepositoryUpdateQuerys';




export default {
    getVehicleInfo: async (driverId: ObjectId) => {
        try {
            return await driverRepositoryGetQuerys.getVehicleInfoWithDriverId(driverId)
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

    updateVehicleInfo: async (driverId: ObjectId, data: vehicleInfo) => {
        try {
            return await driverRepositoryUpdateQuerys.updateVehicleInfo(data, driverId)
        } catch (error) {
            throw new Error((error as Error).message)
        }
    }
}
