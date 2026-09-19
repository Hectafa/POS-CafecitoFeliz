import productService from '../services/productService.js';

export async function getProducts(req, res) {
    try {
        const products = await productService.getAllProducts();

        res.json(products);
    } catch (err) {
        res.status(500).json({ message: "Error fetching products: " + err.message });   
    }
}


