import mongoose from "mongoose";

async function connect(mongoURL: string) {
    try {
        await mongoose.connect(mongoURL);
        console.log("DB Connected Successfully");
    } catch (error) {
        console.error("Error connecting to the database:", error);
        console.log("Cannot connect");
    }
}

export default connect;