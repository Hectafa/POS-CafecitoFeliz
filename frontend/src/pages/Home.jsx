import { useEffect, useState } from "react";
import api from "../services/api";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Ticket from "../components/Ticket";
import "../styles/home.css";

export default function Home( {user} ) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const [cart, setCart] = useState([]);
    const [checkout, setCheckout] = useState(false);
    const [order, setOrder] = useState(null);
    const [search, setSearch] = useState("");


const categories = [ "Todos", "Café", "Bebidas", "Alimentos", "Postres", ];


useEffect(() => {
    let cancelled = false;

    const loadProducts = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await api.get("/products");

            if (!cancelled)
                setProducts(response.data);
        } 
        catch (error) {
            if (!cancelled) setError("Error al cargar los productos", error);
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

const filteredProducts = products.filter((product) => {

    const matchSearch = product.name.toLowerCase().includes(search.toLowerCase());

    return matchSearch;
});

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

const cartTotal = cart.reduce(
    (total, item) => total + (item.price * item.quantity), 0
);

const handleCheckout = async () => {
    if (cart.length === 0) {
        return;
    }

    try {
        setCheckout(true);

        const orderData = {
            items: cart.map((item) => ({
                productId: item._id,
                quantity: item.quantity,
            })),
        };

        const response = await axios.post(
            "http://localhost:3000/api/orders",
            orderData
        );

        setOrder(response.data.order);
        setCart([]);
    } catch (error) {
        alert(
            error.response?.data?.message ||
            "Error al crear la orden"
        );
    } finally {
        setCheckout(false);
    }
};

const handleNewSale = () => {
    setOrder(null);
};

return (
    <div className="home-container">
        <header className="header">
            <div>
                <h1>CAFECITO FELIZ</h1>
                <p>Punto de venta</p>
            </div>

            <div className="user-info">
                <span>👤</span>
                <span>{user.role}</span>
            </div>
        </header>

        <main className="main-content">
            <section className="products-section">
                <h2>Productos</h2>
                <div className="search-container">
                    <input 
                    type="text"
                    placeholder="Buscar productos..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-input"
                    />
                </div>

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
                            <p>No se encontraron productos</p>
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
                        disabled={cart.length === 0 || checkout}
                        onClick={handleCheckout}
                        >
                            {checkout}
                            Cobrar
                    </button>
                </div>

                {order && (
                    <Ticket
                    order={order}
                    newSale={handleNewSale}
                    />
                )}
            </aside>
        </div>
    );
}
