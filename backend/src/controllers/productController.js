import productService from '../services/productService.js';

export async function getProducts(req, res) {
    try {
        const products = await productService.getAllProducts();

        res.json(products);
    } catch (err) {
        res.status(500).json({ message: "Error fetching products: " + err.message });
    }
}

export async function createProduct(req, res) {
    try {
        const {
            name,
            price,
            stock,
            category,
            description,
        } = req.body;

        if (
            !name ||
            price === undefined ||
            stock === undefined ||
            !category
        ) {
            return res.status(400).json({
                message:
                    "Missing required fields: name, price, stock, or category",
            });
        }

        const product = await productService.createProduct({
            name,
            price,
            stock,
            category,
            description,
        });

        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ message: "Error creating product: " + err.message });
    }
}

export async function updateProduct(req, res) {
    try {
        const { id } = req.params;

        const product =
            await productService.updateProduct(id, req.body);

        if (!product) {
            return res.status(404).json({
                message: "Poduct not found",
            });
        }

        res.json({
            product,
        });
    } catch (err) {
        res.status(500).json({ message: "Error updating product: " + err.message });
    }
}

export async function deleteProduct(req, res) {
    try {
        const { id } = req.params;

        const product = await productService.deleteProduct(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.json({
            message: "Product deleted successfully",
        });
    } catch (err) {
        res.status(500).json({ message: "Error deleting product: " + err.message });
    }
}



