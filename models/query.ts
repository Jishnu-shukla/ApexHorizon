import mongoose, { models } from "mongoose";

const querySchema = new mongoose.Schema({
    name: {
        type: String,
        require: false
    },
    email: {
        type: String,
        require: true
    },
    interest: {
        type: String,
        enum: ["website", "saas", "automation", "api", "other"],
        default: "other"
    },
    message: {
        type: String,
        require: false
    }
}, { timestamps: true })

export default models.Query || mongoose.model('Query', querySchema)