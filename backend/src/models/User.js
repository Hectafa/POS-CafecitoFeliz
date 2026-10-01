import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: ["vendedor", "admin"],
            required: true,
            default: "vendedor",
        },
    },

    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;