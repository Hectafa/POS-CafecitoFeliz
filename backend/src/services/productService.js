import Product from "../models/Product.js";

async function getAllProducts() {
    try {
        return await Product.find();
    } catch (err) {
        throw new Error("Error fetching products: " + err.message);
    }
}

async function createProduct(productData) {
    try {
        const product = new Product(productData);

        return await product.save();
    } catch (err) {
        throw new Error("Error creating product: " + err.message);
    }
}

async function updateProduct(productId, productData) {
    try {
        const product = await Product.findByIdAndUpdate(
            productId,
            productData,
            {
                new: true,
                runValidators: true,
            }
        );

        return product;
    } catch (err) {
        throw new Error(
            "Error updating product: " + err.message
        );
    }
}

async function deleteProduct(productId) {
    try {
        return await Product.findByIdAndDelete(productId);
    } catch (err) {
        throw new Error(
            "Error deleting product: " + err.message
        );
    }
}
export default {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
};