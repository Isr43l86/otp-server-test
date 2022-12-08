import mongoose from "mongoose";

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    twoFactorAuthentication: {
        activated: {
            type: Boolean,
            required: true,
        },
        typeOfDelivery: {
            type: String,
        },
    },
});

export default mongoose.model("User", User);
