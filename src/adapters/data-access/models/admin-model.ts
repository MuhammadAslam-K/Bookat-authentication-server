import mongoose, { Schema } from "mongoose";

const adminSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    revenue: {
        type: Number,
        default: 0,
    }
})

const AdminSchema = mongoose.model("admin", adminSchema)

export default AdminSchema