import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/clients.css";

export default function Clients() {
    const [ clients, setClients ] = useState([]);
    const [ name, setName ] = useState("");
    const [ phone, setPhone ] = useState("");
    const [ loading, setLoading ] = useState(true);
    const [ saving, setSaving ] = useState(false);
    const [ error, setError ] = useState(null);

    const loadClients = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.get(
                "http://localhost:3000/api/clients"
            );

            setClients(response.data);
        } catch (error) {
            console.error("Error al cargar clientes:", error);
            setError("No se pudieron cargar los clientes");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadClients();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!name.trim() || !phone.trim()) {
            setError("Nombre y teléfono son abligatorios");
            return;
        }

        try {
            setSaving(true);
            setError(null);

            const response = await axios.post(
                "http://localhost:3000/api/clients",
                {
                    name: name.trim(),
                    phone: phone.trim(),
                }
            );

            setClients((prevClients) => [
                response.data.client,
                ...prevClients,
            ]);

            setName("");
            setPhone("");
        } catch (error) {
            console.error("Error al registrar cliente:", error);

            setError(
                error.response?.data?.message ||
                "No se puede registrar el cliente"
            );
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (clientId) => {
        const confirmed = window.confirm(
            "Quieres eliminar el cliente?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setError(null);

            await axios.delete(
                `http://localhost:3000/api/clients/${clientId}`
            );

            setClients((prevClients) =>
            prevClients.filter(
                    (client) => client._id !== clientId
                )
            );
        } catch (error) {
            console.error("Error al eliminar cliente:", error);

            setError(
                error.response?.data?.message ||
                "No se puede eliminar el cliente"
            );
        }
    };

    return (
        <div className="clients-container">
            <h1>Clientes</h1>

            <section className="client-form-section">
                <h2>Registrar clientes frecuente</h2>

                <form onSubmit={handleSubmit} className="client-form">
                    <div className="form-group">
                        <label htmlFor="name">
                            Nombre
                        </label>

                        <input
                            id="name"
                            type="text"
                            placeholder="Nombre del cliente"
                            value={name}
                            onChange={(e) => 
                                setName(e.target.value)
                            }
                            />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">
                            Teléfono
                        </label>

                        <input
                            id="phone"
                            type="tel"
                            placeholder="Número de teléfono"
                            value={phone}
                            onChange={(e) => 
                                setPhone(e.target.value)
                                }
                            />
                    </div>

                    <button
                        type="submit"
                        disabled={saving}
                    >
                        {saving
                            ? "Guardando..."
                            : "Registrar cliente"}
                    </button>
                </form>
            </section>

            {error && (
                <p className="clients-error">
                    {error}
                </p>
            )}

            <section className="clients-list-section">
                <h2>Clientes registrados</h2>

                {loading ? (
                    <p>Cargando clientes...</p>
                ) : clients.length === 0 ? (
                    <p>No hay clientes registrados</p>
                ) : (
                    <div className="clients-list">
                        {clients.map((client) => (
                            <article
                                key={client._id}
                                className="client-card"
                            >
                                <div className="client-info">
                                    <h3>{client.name}</h3>

                                    <p>
                                        📱 {client.phone}
                                    </p>
                                </div>

                                    <button
                                        className="delete-client-btn"
                                        onClick={() =>
                                            handleDelete(
                                                client._id
                                            )
                                        }
                                    >
                                        Eliminar
                                    </button>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}