import { useState } from "react";
import Home from "./pages/Home";
import Clients from "./pages/Clients";
import "./app.css";

function App() {
  const [currentPage, setCurrentPage] = useState("ventas");

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
      </nav>

      {currentPage === "ventas" && <Home />}
      {currentPage === "clientes" && <Clients />}
    </div>
  );
}

export default App;