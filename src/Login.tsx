import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("citizen");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "password") {
      navigate("/admin"); // Redirige a la vista de administrador
    } else if (username && password) {
      navigate(role === "hero" ? "/hero" : "/citizen"); // Redirige según el rol
    } else {
      setError("Por favor ingrese un usuario y contraseña válidos");
    }
  };

  return (
    <div className="login-container">
      {/* Botones superiores */}
      <div className="login-header">
        <button className="back-button" onClick={() => navigate("/")}>
          Volver
        </button>
        <button className="admin-button">Admin</button>
      </div>
      <div className="login-panel">
        <h1>Iniciar Sesión</h1>
        {error && <p className="error-message">{error}</p>}

        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />

        <div className="role-selection">
          <div>
            <div className="role-option">
              <input
                type="radio"
                id="citizenCheck"
                name="role"
                value="citizen"
                checked={role === "citizen"}
                onChange={() => setRole("citizen")}
              />
              <label htmlFor="citizenCheck">Soy un ciudadano</label>
            </div>
            <div className="role-option">
              <input
                type="radio"
                id="heroCheck"
                name="role"
                value="hero"
                checked={role === "hero"}
                onChange={() => setRole("hero")}
              />
              <label htmlFor="heroCheck">Soy un superhéroe</label>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogin}
          className="login-button"
          style={{ padding: "10px", width: "120px", margin: "15px" }}
        >
          Entrar
        </button>
      </div>
    </div>
  );
};

export default Login;
