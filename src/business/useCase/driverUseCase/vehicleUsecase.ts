import { vehicleInfo } from './driverRegistrationUsecase';
import { Types, ObjectId, Schema } from "mongoose";
import driverRepositoryGetQuerys from "../../../adapters/data-access/repositories/driverRepository/driverRepositoryGetQuerys";
import driverRepositoryUpdateQuerys from '../../../adapters/data-access/repositories/driverRepository/driverRepositoryUpdateQuerys';
import { handleError } from '../../errors/errorHandling';
import cabrepositoryGetQuery from '../../../adapters/data-access/repositories/cabRepository/cabrepositoryGetQuery';
import cabRepositoryUpdateQuery from '../../../adapters/data-access/repositories/cabRepository/cabRepositoryUpdateQuery';

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

    updateVehicleInfo: async (driverId: ObjectId, data: vehicleInfo) => {
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
