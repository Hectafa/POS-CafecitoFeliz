import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.config.js";
import productRoutes from "./src/routes/productRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "API Cafecito Feliz"
    });
});

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 3000;

async function startServer() {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

startServer();
