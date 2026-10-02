import api from './api';

export async function login(name, password) {
    const response = await api.post("/auth/login", { name, password }
    );

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    return response.data;
}

export async function register(name, password) {
    const response = await api.post("/auth/register", {
        name,
        password,
    });

    return response.data;
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}

export function getStoredUser() {
    const user = localStorage.getItem("user");

    return user ? JSON.parse(user) : null;
}