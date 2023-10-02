import mongoose, { Schema } from "mongoose";

const userSchema: Schema = new Schema({
    userName: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    refrel: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    // joinedAt: {
    //     type: Date.now
    // }
})

const UserSchema = mongoose.model("user", userSchema)

export default UserSchema