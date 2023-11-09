import { Types } from "mongoose"
import ChatSchema from "../../models/chat"

interface message {
    sender: string
    content: string
    timestamp: string
}


export default {
    updateChat: async (chatId: Types.ObjectId, message: message,) => {
        try {
            return await ChatSchema.findByIdAndUpdate(
                chatId,
                {
                    $push: {
                        messages: message
                    },
                },
                {
                    new: true
                }
            )
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}