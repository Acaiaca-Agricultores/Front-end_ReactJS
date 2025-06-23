import { useState, createContext } from "react";
import IAcaiPerfil from "../../assets/AIcai-perfil.png";

export const ChatContext = createContext();

const AppChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      window.location.href = import.meta.env.VITE_CHAT_URL;
    }
  };

  return (
    <ChatContext.Provider value={{ toggleChat, isOpen }}>
      <div
        className="app-chat"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "70px",
          height: "70px",
          border: "3px solid #83a11d",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          overflow: "hidden",
          backgroundColor: "white",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
          borderRadius: "50%",
          cursor: "pointer",
        }}
        onClick={toggleChat}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleChat();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Abrir chat com assistente virtual IAcai"
        aria-pressed={isOpen}
      >
        <img 
          src={IAcaiPerfil} 
          alt="Ícone do assistente virtual IAcai" 
          style={{ width: "70px" }} 
        />
      </div>
    </ChatContext.Provider>
  );
};

export default AppChat;
