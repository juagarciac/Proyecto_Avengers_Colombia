import React, { useState } from "react";
import { Container, Dropdown, List, Segment, Header, Message, Input, Button } from "fomantic-ui-react";
import "fomantic-ui-css/semantic.min.css";

const citizenName = "Juan Pérez"; // Replace with dynamic data if needed

const heroes = [
  { id: 1, name: "Iron Man" },
  { id: 2, name: "Spider-Man" },
  { id: 3, name: "Thor" },
];

const activeCases = [
  { id: 101, title: "Flood in Bogotá", description: "Need rescue support in flooded area." },
  { id: 102, title: "Medical Emergency", description: "Injured people need assistance." },
  { id: 103, title: "Power Outage", description: "Residents need backup generators." },
];

const CitizenView: React.FC = () => {
  const [selectedHero, setSelectedHero] = useState<number | null>(null);
  const [selectedCase, setSelectedCase] = useState<number | null>(null);
  const [chatMessages, setChatMessages] = useState<{ [key: number]: string[] }>({});
  const [message, setMessage] = useState<string>("");

  const handleSendMessage = () => {
    if (selectedHero && message.trim() !== "") {
      setChatMessages({
        ...chatMessages,
        [selectedHero]: [...(chatMessages[selectedHero] || []), message],
      });
      setMessage("");
    }
  };

  return (
    <Container className="citizen-view" style={{ height: "100vh", padding: "20px", display: "flex", flexDirection: "column" }}>
      
      {/* Header with Citizen Name */}
      <Segment textAlign="center" style={{ width: "100%", marginBottom: "10px" }}>
        <Header as="h2">Welcome, {citizenName}</Header>
      </Segment>

      {/* Main Content: Split Layout */}
      <div style={{ display: "flex", flex: 1 }}>
        
        {/* Left Panel: List of Active Heroes */}
        <Segment style={{ width: "25%", overflowY: "auto" }}>
          <Header as="h3">Active Heroes</Header>
          <List selection>
            {heroes.map((hero) => (
              <List.Item key={hero.id} onClick={() => setSelectedHero(hero.id)}>
                {hero.name}
              </List.Item>
            ))}
          </List>
        </Segment>

        {/* Right Panel: Chat and Cases Stacked */}
        <div style={{ width: "75%", display: "flex", flexDirection: "column", marginLeft: "10px" }}>
          
          {/* Chat Section (Top Half) */}
          <Segment style={{ flex: 1 }}>
            <Dropdown
              placeholder="Select a Hero"
              fluid
              selection
              options={heroes.map((hero) => ({ key: hero.id, text: hero.name, value: hero.id }))}
              onChange={(_, { value }) => setSelectedHero(value as number)}
            />
            <Segment style={{ height: "100%", overflowY: "auto", marginTop: "10px" }}>
              <Header as="h4">Chat with {selectedHero ? heroes.find(h => h.id === selectedHero)?.name : "..."}</Header>
              {selectedHero && chatMessages[selectedHero]?.length ? (
                chatMessages[selectedHero].map((msg, index) => <Message key={index} content={msg} />)
              ) : (
                <Message info content="No messages yet." />
              )}
            </Segment>
            <Input
              fluid
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              action={<Button onClick={handleSendMessage} color="blue">Send</Button>}
            />
          </Segment>

          {/* Cases Section (Bottom Half) */}
          <Segment style={{ flex: 1, marginTop: "10px" }}>
            <Dropdown
              placeholder="Select a Case"
              fluid
              selection
              options={activeCases.map((c) => ({ key: c.id, text: c.title, value: c.id }))}
              onChange={(_, { value }) => setSelectedCase(value as number)}
            />
            {selectedCase && (
              <Segment>
                <Header as="h4">{activeCases.find(c => c.id === selectedCase)?.title}</Header>
                <p>{activeCases.find(c => c.id === selectedCase)?.description}</p>
              </Segment>
            )}
          </Segment>

        </div>
      </div>
    </Container>
  );
};

export default CitizenView;
