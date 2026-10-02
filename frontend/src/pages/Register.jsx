import { useState } from "react";
import { register } from "../services/authService";
import "../styles/auth.css";

export default function Register({ onGoToLogin }) {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !password || !confirmPassword) {
            setError ("Nombre y contraseña son obligatorios.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            await register(name, password);

            setName("");
            setPassword("");
            setConfirmPassword("");

        } catch (err) {
            console.error("Error during registration:", err);

            setError(
                error.response?.data?.error || "Ocurrió un error durante el registro. Por favor, inténtalo de nuevo."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>CAFECITO FELIZ</h1>
                <h2>Registro</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">
                            Nombre:
                        </label>

                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nombre de usuario"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">
                            Contraseña:
                        </label>

                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Contraseña"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">
                            Confirmar Contraseña:
                        </label>
                    
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirmar Contraseña"
                        />
                    </div>

                    {error && (
                        <p className="auth-error">{error}</p>
                    )}

                    <button 
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Registrando..." : "Registrarse"}
                    </button>
                </form>
                    <button
                        className="secondary-button"
                        onClick={onGoToLogin}
                        type="button"
                    >
                        ¿Ya tienes una cuenta? Inicia sesión
                    </button>
            </div>
        </div>
    );
}