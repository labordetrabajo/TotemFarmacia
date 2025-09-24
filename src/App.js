import { useState } from "react";

function App() {
  const [pantalla, setPantalla] = useState("inicio"); // inicio | opciones | resultado
  const [turno, setTurno] = useState(null);

  // Función que pide un turno al backend
  const pedirTurno = async (tipo) => {
    try {
      const res = await fetch("http://localhost:4000/turno", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo }),
      });
      const data = await res.json();
      setTurno(data.numero);
      setPantalla("resultado");
    } catch (error) {
      console.error("Error al pedir turno:", error);
    }
  };

  // Pantalla de inicio
  if (pantalla === "inicio") {
    return (
      <div
        onClick={() => setPantalla("opciones")}
        style={{
          fontSize: 40,
          textAlign: "center",
          marginTop: "30vh",
          cursor: "pointer",
        }}
      >
        Toque la pantalla para comenzar
      </div>
    );
  }

  // Pantalla de opciones
  if (pantalla === "opciones") {
    return (
      <div style={{ textAlign: "center", marginTop: "20vh" }}>
        <button
          style={{ fontSize: 40, margin: 20 }}
          onClick={() => pedirTurno("OS")}
        >
          Obra Social
        </button>
        <button
          style={{ fontSize: 40, margin: 20 }}
          onClick={() => pedirTurno("CP")}
        >
          Particular
        </button>
        <button
          style={{ fontSize: 40, margin: 20 }}
          onClick={() => setPantalla("inicio")}
        >
          Salir
        </button>
      </div>
    );
  }

  // Pantalla de resultado (muestra el número generado)
  if (pantalla === "resultado") {
    return (
      <div style={{ textAlign: "center", marginTop: "20vh" }}>
        <h1>Su número es:</h1>
        <h2 style={{ fontSize: 80 }}>{turno}</h2>
        <button
          onClick={() => setPantalla("inicio")}
          style={{ fontSize: 40, marginTop: 20 }}
        >
          Volver
        </button>
      </div>
    );
  }
}

export default App;
