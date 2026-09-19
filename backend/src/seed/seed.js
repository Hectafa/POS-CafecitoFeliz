import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

const initialProducts = [
    { name: "Americano", price: 35, category: "Café" },
    { name: "Cappuccino", price: 48, category: "Café" },
    { name: "Latte", price: 45, category: "Café" },
    { name: "Frappé", price: 60, category: "Bebidas" },
    { name: "Croissant", price: 42, category: "Alimentos" },
    { name: "Cheesecake", price: 55, category: "Postres" }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connection to MongoDB established");

        await Product.deleteMany({});
        console.log("Existing products deleted");

        await Product.insertMany(initialProducts);
        console.log("Initial products inserted");

        mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error("Error seeding the DB", error);
        process.exit(1);
    }
};

seedDatabase();