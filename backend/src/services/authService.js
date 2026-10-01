import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

async function registerUser(userData) {
    try {
        const { name, password } = userData;

        const Name = name.toLowerCase();

        const existingUser = await User.findOne({
            name: Name,
        });

        if (existingUser) {
            throw new Error("El usuario ya existe");
        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        const user = new User({
            name: Name,
            password: hashedPassword,
            role: "vendedor",
        });

        await user.save();

        return {
            id: user._id,
            name: user.name,
            role: user.role,
        };
    } catch (error) {
        throw new Error(error.message);
    }
}

async function loginUser(name, password) {
    const Name = name.toLowerCase();

    const user = await User.findOne({
        name: Name,
    });

    if (!user) {
        throw new Error("User not found");
    }

    const passwordMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!passwordMatch) {
        throw new Error("Invalid password");
    }

    const token = jwt.sign(
        {
            userId: user._id,
            role: user.role,
            name: user.name,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "24h",
        }
    );

    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            role: user.role,
        },
    };
}

export default {
    registerUser,
    loginUser,
};