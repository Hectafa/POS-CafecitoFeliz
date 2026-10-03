import { useState } from "react";
import Home from "./pages/Home";
import Clients from "./pages/Clients";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {
      getStoredUser,
      logout,
} from "./services/authService";
import "./app.css";

const App = () => {
  const [user, setUser] = useState(getStoredUser());
  const [currentPage, setCurrentPage] = useState("ventas");
  const [authPage, setAuthPage] = useState("login");

  if (!user) {
    if (authPage === "register") {
      return (
        <Register
          onGoToLogin={() => setAuthPage("login")}
        />
      );
    }

    return (
      <Login
        onLogin={setUser}
        onGoToRegister={() => setAuthPage("register")}
      />
    );
  }

  const handleLogout = () => {
    logout();
    setUser(null);
    setCurrentPage("ventas");
  };

  return (
    <div className="App">
      <nav className="main-nav">
        <button
        className={currentPage === "ventas" ? "active" : ""}
        onClick={() => setCurrentPage("ventas")}
        >
          Ventas
        </button>

        <button
          className={currentPage === "clientes" ? "active" : ""}
          onClick={() => setCurrentPage("clientes")}
        >
          Clientes
        </button>

        {user.role === "admin" && (
          <button
            className={
              currentPage === "productos"
                ? "active"
                : ""
            }
            onClick={() => setCurrentPage("productos")}
          >
            Productos
          </button>
        )}

        <span>
          Usuario: {user.name}
        </span>

        <button onClick={handleLogout}>
          Cerrar sesión
        </button>
      </nav>

      {currentPage === "ventas" && <Home user={user}/>}
      {currentPage === "clientes" && <Clients />}
      {currentPage === "productos" && <Products />}
    </div>
  );
}

export default App;