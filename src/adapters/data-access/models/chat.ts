import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema({
    rideId: {
        type: String,
        required: true
    },
    // userId: {
    //     type: String,
    //     required: true
    // },
    // driverId: {
    //     type: String,
    //     required: true
    // },
    messages: [
        {
            sender: {
                type: String,
                required: true
            },
            content: {
                type: String,
                required: true
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

const ChatSchema = mongoose.model("Chat", chatSchema);

export default ChatSchema;
