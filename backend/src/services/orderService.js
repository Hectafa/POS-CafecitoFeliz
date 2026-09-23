import mongoose from 'mongoose';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

const createOrder = async (items) => {
    if (items.length === 0) {
        throw new Error("Order must contain at least one item.");
    }

    const repeatedProducts = {};

    for (const item of items) {
        const { productId, quantity } = item;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            throw new Error(`Invalid product ID: ${productId}`);
        }

        if (!Number.isInteger(quantity) || quantity < 1) {
            throw new Error(`Invalid quantity for product ID ${productId}. Quantity must be up to 0.`);
        }

        if (repeatedProducts[productId]) {
            repeatedProducts[productId] += quantity;
        } else {
            repeatedProducts[productId] = quantity;
        }
    }

    const productIds = Object.keys(repeatedProducts);

    const products = await Product.find({
        _id: { $in: productIds }
    });

    if (products.length !== productIds.length) {
        throw new Error("One or more products do not exist.");
    }

    const orderItems = products.map((product) => {
        const quantity = repeatedProducts[product._id.toString()];
        const price = product.price;
        const subtotal = price * quantity;

        return {
            productId: product._id,
            name: product.name,
            price,
            quantity,
            subtotal,
        };
    });

    const total = orderItems.reduce(
        (sum, item) => sum + item.subtotal, 0
    );

    const order = await Order.create({
        items: orderItems,
        total,
    });

    return order;
};

export default {
    createOrder,
};