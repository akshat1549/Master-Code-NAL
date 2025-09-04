import React, { useState } from "react";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages((prev) => [...prev, { from: "user", text: userMsg }]);
    setInput("");
    setTyping(true);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { from: "bot", text: data.reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { from: "bot", text: "⚠️ Cannot reach backend" }]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "#007bff",
          color: "white",
          borderRadius: "50%",
          padding: "15px",
          cursor: "pointer",
          fontSize: "20px",
        }}
        onClick={toggleChat}
      >
        💬
      </div>

      {/* Chat Panel */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "300px",
            height: "400px",
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          }}
        >
          {/* Header with Close Button */}
          <div
            style={{
              background: "#007bff",
              color: "white",
              padding: "10px",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>NAL Chatbot 🤖</span>
            <button
              onClick={toggleChat}
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              ✖
            </button>
          </div>

          <div style={{ flex: 1, padding: "10px", overflowY: "auto" }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ marginBottom: "8px", textAlign: msg.from === "user" ? "right" : "left" }}>
                <b>{msg.from === "user" ? "You" : "Bot"}:</b> {msg.text}
              </div>
            ))}
            {typing && <div><i>Bot is typing...</i></div>}
          </div>

          <div style={{ display: "flex", borderTop: "1px solid #ccc" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type here..."
              style={{ flex: 1, border: "none", padding: "10px" }}
            />
            <button onClick={sendMessage} style={{ padding: "10px", background: "#007bff", color: "white", border: "none" }}>
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
