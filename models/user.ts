import mongoose, { models } from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: false
    },
    business: {
        type: String,
        required: false
    },
    product: {
        type: String,
        required: true,
        default: "ApexManagement"
    }
}, { timestamps: true });

export default models.User || mongoose.model('User', userSchema);
