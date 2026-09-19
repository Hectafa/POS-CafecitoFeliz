function ProductCard({ product, onAddToCart }) {
    return (
        <a className="product-card">
            <div className="product-image">
                ☕
            </div>

            <div className="product-details">
                <h3>{product.name}</h3>
                <p>{product.category}</p>
                <p>${product.price.toFixed(2)}</p>

                <button 
                    className="add-to-cart-btn"
                    onClick={() => onAddToCart(product)}
                    >
                        Agregar
                    </button>
            </div>
        </a>
    );
}

export default ProductCard;