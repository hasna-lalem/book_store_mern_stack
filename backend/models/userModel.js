import mongoose from "mongoose";
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        userID: {
            type: String,
            required: true,
            unique: true
        },
        email:{
            type: String,
            required: true,
            lowercase: true,
            minLength: 10,
            unique: true,
        },
        userType: {
            type: String,
            required: true,
            default: "CUSTOMER",
            enum: ["ADMIN", "CUSTOMER"]
        },
        password: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true, // ajoute deux champs automatiquement au document (creatAT, updatedAt)
        versionKey: false,
    }
)
export const User = mongoose.model('User', userSchema);