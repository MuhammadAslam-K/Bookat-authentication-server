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
})

const AdminSchema = mongoose.model("admin", adminSchema)

export default AdminSchema