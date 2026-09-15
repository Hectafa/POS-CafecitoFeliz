import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "../styles/home.css";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategorie, setSelectedCategorie] = useState("Todos");


const categories = [ "Todos", "Café", "Bebidas", "Alimentos", "Postres", ];
const productsData = [ 
    { id: 1, nombre: "Americano", precio: 35, categorie: "Café", }, 
    { id: 2, nombre: "Cappuccino", precio: 48, categorie: "Café", }, 
    { id: 3, nombre: "Latte", precio: 45, categorie: "Café", }, 
    { id: 4, nombre: "Frappé", precio: 60, categorie: "Bebidas", }, 
    { id: 5, nombre: "Croissant", precio: 42, categorie: "Alimentos", }, 
    { id: 6, nombre: "Cheesecake", precio: 55, categorie: "Postres", }, 
];

useEffect(() => {
    let cancelled = false;

    const loadProducts = async () => {
        try {
            setLoading(true);
            setError(null);

            const filteredProducts = selectedCategorie === "Todos"
            ? productsData
            : productsData.filter(
                (producto) => producto.categorie === selectedCategorie
            );

            if (!cancelled)
            setProducts(filteredProducts);
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
}, [selectedCategorie]);

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
                    {categories.map((categorie) => (
                        <button
                            key={categorie}
                            className={
                                selectedCategorie === categorie
                                    ? "category-button selected"
                                    : "category-button"
                            }
                            onClick={() => setSelectedCategorie(categorie)}
                        >
                            {categorie}
                        </button>
                    ))}
                    </div>

                    <div className="products-grid">
                        {products.map((products) => (
                            <ProductCard 
                            key={products.id}
                            product={products}
                            />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
