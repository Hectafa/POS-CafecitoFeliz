import Product from "../models/Product.js";

async function getAllProducts() {
    try {
        return await Product.find();
    } catch (err) {
        throw new Error("Error fetching products: " + err.message);
    }
}

export default {
    getAllProducts,
};