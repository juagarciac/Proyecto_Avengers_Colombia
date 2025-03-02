import React, { useState } from "react";
import "./App.css";
import { Button } from "fomantic-ui-react";
import { Navigate, useNavigate } from "react-router-dom";

const citizenName = "Ciudadano";

const heroes = [
  { id: 1, name: "Iron Man" },
  { id: 2, name: "Spider-Man" },
  { id: 3, name: "Thor" },
];

const activeCases = [
  {
    id: 101,
    title: "Flood in Bogotá",
    description: "Need rescue support in flooded area.",
  },
  {
    id: 102,
    title: "Medical Emergency",
    description: "Injured people need assistance.",
  },
  {
    id: 103,
    title: "Power Outage",
    description: "Residents need backup generators.",
  },
];

const CitizenView: React.FC = () => {
  const [selectedHero, setSelectedHero] = useState<number | null>(null);
  const [selectedCase, setSelectedCase] = useState<number | null>(null);
  const [chatMessages, setChatMessages] = useState<{ [key: number]: string[] }>(
    {}
  );
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (selectedHero && message.trim() !== "") {
      setChatMessages((prev) => ({
        ...prev,
        [selectedHero]: [...(prev[selectedHero] || []), message],
      }));
      setMessage("");
    }
  };

  const navigate = useNavigate();

  return (
    <div className="custom-container">
      {/* Header */}
      <header className="custom-header">
        <Button
          color="yellow"
          size="large"
          className="custom-button"
          onClick={() => navigate("/login")}
        >
          Crear Ciudadano
        </Button>
        <h1>Bienvenido {citizenName}</h1>
        <Button
          color="yellow"
          size="large"
          className="custom-button"
          onClick={() => navigate("/login")}
        >
          Cerrar Sesión
        </Button>
      </header>

      <div className="main-content">
        {/* Left Panel: Profile */}
        <div className="left-panel" style={{ padding: "30px" }}>
          <h2>Héroes Activos</h2>
          <div className="galeria">
            <img src="/images/imagen1.jpg" alt="Imagen 1" />
            <img src="/images/imagen2.jpg" alt="Imagen 2" />
            <img src="/images/imagen3.jpg" alt="Imagen 3" />
            <img src="/images/imagen4.jpg" alt="Imagen 4" />
            <img src="/images/imagen5.jpg" alt="Imagen 5" />
            <img src="/images/imagen6.jpg" alt="Imagen 6" />
          </div>
        </div>

        {/* Right Panel: Chat & Cases */}
        <div className="right-panel">
          {/* Chat Section */}
          <div className="chat-section">
            <select
              onChange={(e) => setSelectedHero(Number(e.target.value))}
              value={selectedHero || ""}
            >
              <option value="">Select a Hero</option>
              {heroes.map((hero) => (
                <option key={hero.id} value={hero.id}>
                  {hero.name}
                </option>
              ))}
            </select>

            <div className="chat-box">
              <h4>
                Chat con{" "}
                {selectedHero
                  ? heroes.find((h) => h.id === selectedHero)?.name
                  : "..."}
              </h4>
              <div className="messages">
                {selectedHero && chatMessages[selectedHero]?.length ? (
                  chatMessages[selectedHero].map((msg, index) => (
                    <p key={index} className="message">
                      {msg}
                    </p>
                  ))
                ) : (
                  <p className="info">Todavía no hay mensajes.</p>
                )}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                width: "100%",
              }}
            >
              <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{
                  flex: "85%",
                  padding: "10px",
                  borderRadius: "3px",
                  backgroundColor: "white",
                }}
              />
              <button
                className="send-btn"
                onClick={handleSendMessage}
                style={{ flex: "15%", padding: "10px", borderRadius: "5px" }}
              >
                Send
              </button>
            </div>
          </div>

          {/* Cases Section */}
          <div
            className="cases-section"
            style={{
              flex: "15%",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <select
              onChange={(e) => setSelectedCase(Number(e.target.value))}
              value={selectedCase || ""}
            >
              <option value="">Selecciona un caso</option>
              {activeCases.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>

            {selectedCase && (
              <div className="case-box">
                <h4>{activeCases.find((c) => c.id === selectedCase)?.title}</h4>
                <p>
                  {activeCases.find((c) => c.id === selectedCase)?.description}
                </p>
              </div>
            )}
            <div style={{ display: "flex", gap: "10px" }}>
              <button style={{ padding: "15px", width: "30%", color: "red" }}>
                Denunciar Superheroe
              </button>
              <button style={{ padding: "10px", width: "70%", color: "green" }}>
                Caso Resuelto
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenView;
