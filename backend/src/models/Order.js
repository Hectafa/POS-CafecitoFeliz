import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },

            name: {
                type: String,
                required: true,
            },

            price: {
                type: Number,
                required: true,
            },

            quantity: {
                type: Number,
                required: true,
                min: 1,
            },

            subtotal: {
                type: Number,
                required: true,
                min: 0,
            },
        }
    ],

    total: {
        type: Number,
        required: true,
        min: 0,
    },

    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending'
    },
},
    {
        timestamps: true,
    }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
