function ProductCard({ product }) {
    return (
        <a className="product-card">
            <div className="product-image">
                ☕
            </div>

            <div className="product-details">
                <h3>{product.nombre}</h3>
                <p>{product.categorie}</p>
                <p>${product.precio.toFixed(2)}</p>
            </div>
        </a>
    );
}

export default ProductCard;