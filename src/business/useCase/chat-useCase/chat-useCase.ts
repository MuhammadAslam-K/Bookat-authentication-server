import chatRepositoryGetQuery from "../../../adapters/data-access/repositories/chat-repository/chatRepositoryGetQuery"
import chatRepositorySaveQuery from "../../../adapters/data-access/repositories/chat-repository/chatRepositorySaveQuery"
import chatRepositoryUpdateQuery from "../../../adapters/data-access/repositories/chat-repository/chatRepositoryUpdateQuery"

export interface chat {
    rideId: string,
    message: {
        sender: string
        content: string
        timestamp: string
    }
}



export default {
    saveChat: async (data: chat) => {
        try {
            const checkChatExists = await chatRepositoryGetQuery.getChatByRideId(data.rideId)

            if (checkChatExists) {
                await chatRepositoryUpdateQuery.updateChat(checkChatExists._id, data.message)
            }
            else {
                await chatRepositorySaveQuery.createNewChat(data)
            }
            return true
        } catch (error) {
            console.log(error)
        }
    },

    getChatByRideId: async (rideId: string) => {
        try {
            const response = await chatRepositoryGetQuery.getChatByRideId(rideId)
            return response?.messages
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}