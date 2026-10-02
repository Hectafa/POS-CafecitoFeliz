import { useState } from "react";
import { login } from "../services/authService";
import "../styles/auth.css";

export default function Login({ onLogin, onGoToRegister }) {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !password) {
            setError("Please enter both name and password.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const data = await login(name, password);
            onLogin(data.user);
        } catch (err) {
            console.error("Error logging in:", err);

            setError(
                err.response?.data?.error || "An error occurred during login. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>CAFECITO FELIZ</h1>
                <h2>Login</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nombre:</label>

                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nombre de usuario"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña:</label>

                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Contraseña"
                        />
                    </div>

                    {error && <p className="auth-error">{error}</p>}

                    <button type="submit" disabled={loading}>
                        {loading ? "Iniciando..." : "Iniciar sesión"}
                    </button>
                </form>

                <p>¿No tienes una cuenta?</p>

                <button
                    type="button"
                    onClick={onGoToRegister}
                    className="secondary-button"
                >
                    Registrarme
                </button>
            </div>
        </div>
    );
}