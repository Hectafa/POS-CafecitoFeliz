import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/products.css";

export default function Products() {
    const [products, setProducts] = useState([]);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    const [editingId, setEditingId] = useState(null);

    const categories = [
        "Café",
        "Bebidas",
        "Alimentos",
        "Postres",
    ];

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/products");

            setProducts(response.data);
        } catch (err) {
            console.error(
                "Error fetching products:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Ocurrió un error al cargar los productos."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const resetForm = () => {
        setName("");
        setPrice("");
        setStock("");
        setCategory("");
        setDescription("");
        setEditingId(null);
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !name.trim() ||
            price === "" ||
            stock === "" ||
            !category
        ) {
            setError(
                "Nombre, precio, stock y categoría son obligatorios."
            );
            return;
        }

        if (
            Number(price) < 0 ||
            Number(stock) < 0
        ) {
            setError(
                "El precio y el stock deben ser números no negativos."
            );
            return;
        }

        try {
            setSaving(true);
            setError("");

            const productData = {
                name: name.trim(),
                price: Number(price),
                stock: Number(stock),
                category,
                description: description.trim(),
            };

            if (editingId) {
                const response = await api.put(
                    `/products/${editingId}`,
                    productData
                );

                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product._id === editingId
                            ? response.data.product
                            : product
                    )
                );
            } else {
                const response = await api.post(
                    "/products",
                    productData
                );

                setProducts((prevProducts) => [
                    response.data.product,
                    ...prevProducts,
                ]);
            }

            resetForm();
        } catch (err) {
            console.error(
                "Error saving product:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Ocurrió un error al guardar el producto."
            );
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (product) => {
        setEditingId(product._id);

        setName(product.name);
        setPrice(product.price);
        setStock(product.stock ?? "");
        setCategory(product.category);
        setDescription(product.description ?? "");

        setError("");
    };

    const handleDelete = async (productId) => {
        const confirmed = window.confirm(
            "¿Quieres eliminar este producto?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");

            await api.delete(
                `/products/${productId}`
            );

            setProducts((prevProducts) =>
                prevProducts.filter(
                    (product) =>
                        product._id !== productId
                )
            );

            if (editingId === productId) {
                resetForm();
            }
        } catch (err) {
            console.error(
                "Error al eliminar producto:",
                err
            );

            setError(
                err.response?.data?.message ||
                "No se pudo eliminar el producto."
            );
        }
    };

    return (
        <div className="products-container">
            <h1>Productos</h1>

            <section className="product-form-section">
                <h2>
                    {editingId
                        ? "Editar producto"
                        : "Registrar producto"}
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="product-form"
                >
                    <div className="form-group">
                        <label htmlFor="products-name">
                            Nombre
                        </label>

                        <input
                            id="products-name"
                            type="text"
                            placeholder="Nombre del producto"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="products-price">
                            Precio
                        </label>

                        <input
                            id="products-price"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="Precio"
                            value={price}
                            onChange={(e) =>
                                setPrice(e.target.value)
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="products-stock">
                            Stock
                        </label>

                        <input
                            id="products-stock"
                            type="number"
                            min="0"
                            step="1"
                            placeholder="Cantidad en stock"
                            value={stock}
                            onChange={(e) =>
                                setStock(e.target.value)
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="products-category">
                            Categoría
                        </label>

                        <select
                            id="products-category"
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value)
                            }
                        >
                            <option value="">
                                Selecciona una categoría
                            </option>

                            {categories.map((category) => (
                                <option
                                    key={category}
                                    value={category}
                                >
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="products-description">
                            Descripción
                        </label>

                        <textarea
                            id="products-description"
                            placeholder="Descripción del producto (opcional)"
                            value={description}
                            onChange={(e) =>
                                setDescription(
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    {error && (
                        <p className="products-error">
                            {error}
                        </p>
                    )}

                    <div className="form-buttons">
                        <button
                            type="submit"
                            disabled={saving}
                        >
                            {saving
                                ? "Guardando..."
                                : editingId
                                    ? "Guardar cambios"
                                    : "Registrar producto"}
                        </button>

                        {editingId && (
                            <button
                                type="button"
                                onClick={resetForm}
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>
            </section>

            <section className="products-list-section">
                <h2>Productos registrados</h2>

                {loading ? (
                    <p>Cargando productos...</p>
                ) : products.length === 0 ? (
                    <p>
                        No hay productos registrados.
                    </p>
                ) : (
                    <div className="products-list">
                        {products.map((product) => (
                            <article
                                key={product._id}
                                className="admin-product-card"
                            >
                                <div className="admin-product-info">
                                    <h3>
                                        {product.name}
                                    </h3>

                                    <p>
                                        Categoría:{" "}
                                        {product.category}
                                    </p>

                                    <p>
                                        Precio: $
                                        {Number(
                                            product.price
                                        ).toFixed(2)}
                                    </p>

                                    <p>
                                        Stock:{" "}
                                        {product.stock ?? 0}
                                    </p>

                                    {product.description && (
                                        <p>
                                            {
                                                product.description
                                            }
                                        </p>
                                    )}
                                </div>

                                <div className="product-actions">
                                    <button
                                        onClick={() =>
                                            handleEdit(
                                                product
                                            )
                                        }
                                    >
                                        Editar
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                product._id
                                            )
                                        }
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}