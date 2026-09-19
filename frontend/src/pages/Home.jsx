import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "../styles/home.css";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const [cart, setCart] = useState([]);


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

const filteredProducts = selectedCategory === "Todos"
    ? products
    : products.filter((product) => product.category === selectedCategory);

const addToCart = (product) => {
    setCart((prevCart) => {
        const existingProduct = prevCart.find(item => item._id === product._id);
            if (existingProduct) {
                return prevCart.map(item =>
                    item._id === product._id
                        ? {...item, quantity: item.quantity + 1}
                        : item
                );
            } else {
                return [...prevCart, {...product, quantity: 1 }];
            }
    });
};

const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item._id !== productId));
};

const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);


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
                                selectedCategory === category
                                    ? "category-button selected"
                                    : "category-button"
                            }
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                    </div>

                    <div className="products-grid">
                        {loading && <p>Cargando productos...</p>}
                        {error && <p className="error">{error}</p>}

                        {!loading && !error && filteredProducts.map((product) => (
                            <ProductCard 
                                key={product._id} 
                                product={product}
                                onAddToCart={addToCart} 
                            />
                        ))}

                        {filteredProducts.length === 0 && !loading && !error && (
                            <p>No se encontraron productos en esta categoría.</p>
                        )}
                    </div>
                </section>
            </main>

            <aside className="cart-section">
                <h2>Ticket</h2>

                <div className="cart-items">
                    {cart.length === 0 ? (
                        <p className="empty-cart">Agrega productos</p>
                    ) : (
                        cart.map(item => (
                            <div key={item._id} className="cart-item">
                                <div className="cart-item-info">
                                    <span className="item-name">{item.name}</span>
                                    <span className="item-price">{item.price?.toFixed(2)} * {item.quantity}</span>
                                </div>
                                <div className="cart-item-actions">
                                    <span className="item-subtotal">${(item.price * item.quantity).toFixed(2)}</span>
                                    <button onClick={() => removeFromCart(item._id)} className="delete-btn">❌</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="cart-total">
                    <h3>Total: ${cartTotal.toFixed(2)}</h3>
                    <button
                        className="checkout-btn"
                        disabled={cart.length === 0}
                        onClick={() => alert("Checkout functionality not implemented yet.")}>
                            Cobrar
                    </button>
                </div>
            </aside>
        </div>
    );
}
