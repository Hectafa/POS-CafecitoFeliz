import express from "express";

import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/productController.js";

import {
    authenticateToken,
    requireAdmin,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get(
    "/",
    authenticateToken,
    getProducts
);

router.post(
    "/",
    authenticateToken,
    requireAdmin,
    createProduct
);

router.put(
    "/:id",
    authenticateToken,
    requireAdmin,
    updateProduct
);

router.delete(
    "/:id",
    authenticateToken,
    requireAdmin,
    deleteProduct
);

export default router;