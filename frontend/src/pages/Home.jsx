import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "../styles/home.css";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategorie, setSelectedCategorie] = useState("Todos");


const categories = [ "Todos", "Café", "Bebidas", "Alimentos", "Postres", ];


useEffect(() => {
    let cancelled = false;

    const loadProducts = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.get("http://localhost:3000/api/products");

            if (!cancelled)
                setProducts(response.data);
        } 
        catch (err) {
            if (!cancelled) setError("Error al cargar los productos");
        } finally {
            if (!cancelled) {
                setLoading(false);
            }
        }
    };

    loadProducts();

    return () => {
        cancelled = true;
    };
}, []);

const filteredProducts = selectedCategorie === "Todos"
    ? products
    : products.filter((product) => product.category === selectedCategorie);

return (
    <div className="home-container">
        <header className="header">
            <div>
                <h1>CAFECITO FELIZ</h1>
                <p>Punto de venta</p>
            </div>

            <div className="user-info">
                <span>👤</span>
                <span>Vendedor</span>
            </div>
        </header>

        <main className="main-content">
            <section className="products-section">
                <h2>Productos</h2>

                <div className="categories">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={
                                selectedCategorie === category
                                    ? "category-button selected"
                                    : "category-button"
                            }
                            onClick={() => setSelectedCategorie(category)}
                        >
                            {category}
                        </button>
                    ))}
                    </div>

                    <div className="products-grid">
                        {loading && <p>Cargando productos...</p>}
                        {error && <p className="error">{error}</p>}

                        {!loading && !error && filteredProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}

                        {filteredProducts.length === 0 && !loading && !error && (
                            <p>No se encontraron productos en esta categoría.</p>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}
