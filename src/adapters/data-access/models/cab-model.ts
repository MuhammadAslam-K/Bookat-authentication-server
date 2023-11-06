import mongoose, { Schema } from "mongoose";

const cabSchema: Schema = new Schema({
    cabType: {
        type: String
    },
    maxPersons: {
        type: String
    },
    price: {
        type: Number,
    },
    image: {
        type: String,
    },
    available: {
        type: Boolean,
        default: false
    },
    drivers: [
        {
            type: Schema.Types.ObjectId,
            ref: "driver"
        }
    ]
});

const CabSchema = mongoose.model("cab", cabSchema)

export default CabSchema
