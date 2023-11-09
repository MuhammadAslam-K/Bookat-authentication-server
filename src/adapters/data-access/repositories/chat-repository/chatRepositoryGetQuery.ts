import ChatSchema from "../../models/chat";

export default {
    getChatByRideId: async (rideId: string) => {
        try {
            return ChatSchema.findOne({ rideId: rideId })
        } catch (error) {
            throw new Error((error as Error).message);

        }
    }
}