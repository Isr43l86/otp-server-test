import mongoose from "mongoose";

const App = new mongoose.Schema({
    appName: {
        type: String,
        required: true,
    },
    appLogo: {
        url: String,
        public_id: String,
    },
});

export default mongoose.model("App", App);
