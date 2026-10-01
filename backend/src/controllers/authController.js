import authService from "../services/authService.js";

export async function registerUser(req, res) {
    try {
        const { name, password } = req.body;

        if (!name || !password) {
            return res.status(400).json({
                error: "Nombre y contraseña son obligatorios",
            });
        }

        const user = await authService.registerUser({
            name,
            password,
        });

        res.status(201).json({
            message: "User registered successfully",
            user,
        });
    } catch (error) {
        console.error("Register error:", error);

        res.status(400).json({
            error: error.message,
        });
    }
}

export async function loginUser(req, res) {
    try {
        const { name, password } = req.body;

        if (!name || !password) {
            return res.status(400).json({
                error: "Nombre y contraseña son obligatorios",
            });
        }

        const result = await authService.loginUser(
            name,
            password
        );

        res.status(200).json(result);
    } catch (error) {
        console.error("Login error:", error);

        res.status(401).json({
            error: error.message,
        });
    }
}