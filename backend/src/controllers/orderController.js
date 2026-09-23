import orderService from '../services/orderService.js';

export const createOrder = async (req, res) => {
    try {
        const { items } = req.body;
        const order = await orderService.createOrder(items);
        res.status(201).json({ order });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};

