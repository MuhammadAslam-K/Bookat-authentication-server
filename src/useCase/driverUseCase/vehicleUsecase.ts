import { vehicleInfo } from './driverRegistrationUsecase';
import { Types, ObjectId, Schema } from "mongoose";
import driverRepositoryGetQuerys from "../../repositorys/driverRepository/driverRepositoryGetQuerys";
import driverRepositoryUpdateQuerys from '../../repositorys/driverRepository/driverRepositoryUpdateQuerys';
import { handleError } from '../../infrastructure/common/errorHandling';
import cabrepositoryGetQuery from '../../repositorys/cabRepository/cabrepositoryGetQuery';
import cabRepositoryUpdateQuery from '../../repositorys/cabRepository/cabRepositoryUpdateQuery';

export default {
    getVehicleInfo: async (driverId: ObjectId) => {
        try {
            const [cabs, vehicle] = await Promise.all([
                cabrepositoryGetQuery.getAllTheCabs(),
                driverRepositoryGetQuerys.getVehicleInfoWithDriverId(driverId)
            ])
            return { cabs, vehicle }
        } catch (error) {
            handleError(error as Error)
        }
    },

    updateVehicleInfo: async (driverId: ObjectId, driverIdString1: string, data: vehicleInfo) => {
        try {

            const response = await driverRepositoryGetQuerys.findDriverWithId(driverId);
            if (response) {
                const existingVehicleType = response.vehicleDocuments.vehicleType;

                if (existingVehicleType != data.vehicleType) {

                    await Promise.all([
                        cabRepositoryUpdateQuery.updateCabArray(data.vehicleType, driverId),
                        cabRepositoryUpdateQuery.removeDriverId(existingVehicleType, driverId)
                    ]);
                }
            }
            return await driverRepositoryUpdateQuerys.updateVehicleInfo(data, driverId);
        } catch (error) {

            console.log(error)
            handleError(error as Error)
        }
    }
}
