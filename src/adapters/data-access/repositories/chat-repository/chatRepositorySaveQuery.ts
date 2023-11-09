import { chat } from "../../../../business/useCase/chat-useCase/chat-useCase";
import ChatSchema from "../../models/chat";



export default {
    createNewChat: async (data: chat) => {
        try {
            const chat = new ChatSchema({
                rideId: data.rideId,
                messages: data.message
            })
            const result = await chat.save()
            console.log("result :", result)
            return result
        } catch (error) {
            throw new Error((error as Error).message);

        }
    }
}