import { Schema, model } from "mongoose";


const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
            },
        password: {
            type: String,
            required: true
            },
            role: {
                type: String,
                enum: ['admin', 'user'],
                default: 'admin'
            }
        },
        { timestamps: true }
    );

export default model("User", userSchema);