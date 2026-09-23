import "../styles/ticket.css";

export default function Ticket({ order, newSale }) {
    const date = new Date(order.createdAt);

    return (
        <div className="ticket-overlay">
            <div className="ticket">
                <div className="ticket-header">
                    <h2>CAFECITO FELIZ</h2>
                </div>

                <div className="ticket-info">
                    <p>
                        <strong>Orden:</strong> #{order._id}
                    </p>

                    <p>
                        <strong>Fecha:</strong>{" "}
                        {date.toLocaleTimeString()}
                    </p>
                </div>

                <div className="ticket-items">
                    {order.items.map((item) => (
                        <div
                        key={item.productId}
                        className="ticket-item"
                        >
                            <div>
                                <strong>{item.name}</strong>
                                <p>
                                    {item.quantity} * $
                                    {item.price.toFixed(2)}
                                </p>
                            </div>

                            <span>
                                ${item.subtotal.toFixed(2)}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="ticket-total">
                    <strong>TOTAL</strong>
                    <strong>
                        ${order.total.toFixed(2)}
                    </strong>
                </div>

                <div className="ticket-footer">
                    <p>Gracias por tu compra!!</p>
                
                <button
                className="new-sale-btn"
                onClick={newSale}
                >
                    Nueva venta
                </button>
                </div>
            </div>
        </div>
    );
}