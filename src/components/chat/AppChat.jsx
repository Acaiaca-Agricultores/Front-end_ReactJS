import { useState, useEffect, createContext } from "react";
import IAcaiPerfil from "../../assets/AIcai-perfil.png";

export const ChatContext = createContext();

const AppChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cookiesEnabled, setCookiesEnabled] = useState(true);

  useEffect(() => {
    const testCookie = "test_cookie=enabled; path=/";
    document.cookie = testCookie;
    setCookiesEnabled(document.cookie.includes("test_cookie"));
    document.cookie = "test_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  if (!cookiesEnabled) {
    return (
      <div
        style={{
          position: "fixed",
          top: 100,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2000,
          borderRadius: "3rem",
        }}
      >
        <h1>Cookies Disabled</h1>
        <p>This application requires cookies to function. Please enable cookies in your browser and refresh the page.</p>
        <button
          onClick={() => window.location.reload()}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#83a11d",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <ChatContext.Provider value={{ toggleChat, isOpen }}>
      <div
        className="app-chat"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: isOpen ? "400px" : "70px",
          height: isOpen ? "600px" : "70px",
          border: "3px solid #83a11d",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          overflow: "hidden",
          backgroundColor: "white",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
          borderRadius: isOpen ? "0px" : "50%",
        }}
        onClick={toggleChat}
      >
        {isOpen ? (
          <>
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                cursor: "pointer",
                zIndex: 1001,
              }}
              onClick={(e) => {
                e.stopPropagation();
                toggleChat();
              }}
            >
              <img
                src="/src/assets/icons/cancel.png"
                alt="Close Chat"
                style={{ width: "20px", height: "20px" }}
              />
            </div>
            <iframe
              src="teste"
              title="Chatbot"
              style={{ width: "100%", height: "100%", border: "none" }}
              allow="microphone;"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              loading="lazy"
            ></iframe>
          </>
        ) : (
          <img
            src={IAcaiPerfil}
            alt="Chat Icon"
            style={{ width: "70px" }}
          />
        )}
      </div>
    </ChatContext.Provider>
  );
};

export default AppChat;
