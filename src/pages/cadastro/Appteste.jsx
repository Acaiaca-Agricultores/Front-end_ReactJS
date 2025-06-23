import React, { useState, useEffect, useRef } from 'react';
import '../../styles/global-styles.css';
import IAcaiAvatar from '../../assets/logo_semfundo.png';

const Appteste = () => {
  const [messages, setMessages] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userData, setUserData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    senha: '',
    propriedade: '',
    estado: '',
    cidade: '',
    telefone: '',
    nomePropriedade: '',
    historiaAgricultor: ''
  });
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const questions = [
    'Qual é o seu nome?',
    'E o seu sobrenome?',
    'Qual é o seu e-mail?',
    'Crie uma senha para a sua conta:',
    'Você possui uma propriedade rural?',
    'Em qual estado fica sua propriedade?',
    'E em qual cidade?',
    'Qual seu número de telefone para contato?',
    'Qual é o nome da sua propriedade?',
    'Conte um pouco da sua história como agricultor:'
  ];

  const fields = [
    'nome',
    'sobrenome',
    'email',
    'senha',
    'propriedade',
    'estado',
    'cidade',
    'telefone',
    'nomePropriedade',
    'historiaAgricultor'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([
          {
            text: 'Olá! Sou o assistente da IAcai. Vamos fazer seu cadastro? Por favor, responda às perguntas a seguir:',
            sender: 'bot'
          }
        ]);
        setIsTyping(false);
        
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            setMessages(prev => [
              ...prev,
              { text: questions[currentQuestion], sender: 'bot' }
            ]);
            setIsTyping(false);
          }, 1000);
        }, 500);
      }, 1000);
    }
    scrollToBottom();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e) => {
    setCurrentInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!currentInput.trim()) return;
    
    // Add user message
    const newMessages = [...messages, { text: currentInput, sender: 'user' }];
    setMessages(newMessages);
    
    // Update user data
    const updatedUserData = { ...userData };
    updatedUserData[fields[currentQuestion]] = currentInput;
    setUserData(updatedUserData);
    
    setCurrentInput('');
    setIsTyping(true);
    
    // Move to next question
    const nextQuestion = currentQuestion + 1;
    setCurrentQuestion(nextQuestion);
    
    setTimeout(() => {
      if (nextQuestion < questions.length) {
        // If there are more questions, ask the next one
        setMessages(prev => [...prev, { text: questions[nextQuestion], sender: 'bot' }]);
        setIsTyping(false);
      } else {
        // If all questions are answered, show summary
        setMessages(prev => [
          ...prev, 
          { 
            text: 'Obrigado por fornecer todas as informações! Confira se está tudo correto:',
            sender: 'bot'
          },
          {
            text: `Nome completo: ${updatedUserData.nome} ${updatedUserData.sobrenome}
Email: ${updatedUserData.email}
Senha: ${'•'.repeat(updatedUserData.senha.length)}
Propriedade: ${updatedUserData.propriedade}
Estado: ${updatedUserData.estado}
Cidade: ${updatedUserData.cidade}
Telefone: ${updatedUserData.telefone}
Nome da propriedade: ${updatedUserData.nomePropriedade}
História: ${updatedUserData.historiaAgricultor.substring(0, 50)}${updatedUserData.historiaAgricultor.length > 50 ? '...' : ''}`,
            sender: 'bot'
          },
          {
            text: 'Os dados estão corretos? Digite "Sim" para finalizar o cadastro ou "Não" para recomeçar.',
            sender: 'bot'
          }
        ]);
        setIsTyping(false);
      }
    }, 1000);
  };

  const handleConfirmation = (answer) => {
    if (answer.toLowerCase() === 'sim') {
      // Submit the form data
      console.log("Dados do cadastro:", userData);
      setMessages(prev => [
        ...prev,
        { text: 'Cadastro realizado com sucesso! Obrigado por se juntar à IAcai.', sender: 'bot' }
      ]);
      
      // Aqui você pode adicionar a lógica para enviar os dados para um backend
      
    } else if (answer.toLowerCase() === 'não') {
      // Reset the form
      setMessages([
        { text: 'Vamos recomeçar o cadastro. Por favor, responda às perguntas novamente:', sender: 'bot' },
        { text: questions[0], sender: 'bot' }
      ]);
      setCurrentQuestion(0);
      setUserData({
        nome: '',
        sobrenome: '',
        email: '',
        senha: '',
        propriedade: '',
        estado: '',
        cidade: '',
        telefone: '',
        nomePropriedade: '',
        historiaAgricultor: ''
      });
    }
  };

  useEffect(() => {
    // Check if we need to process confirmation
    if (currentQuestion === questions.length && messages[messages.length - 1]?.sender === 'user') {
      const lastUserMessage = messages[messages.length - 1].text;
      handleConfirmation(lastUserMessage);
    }
  }, [messages]);

  return (
    <div className="chat-container" style={containerStyle}>
      <div className="chat-header" style={headerStyle}>
        <img src={IAcaiAvatar} alt="IAcai Logo" style={avatarStyle} />
        <h2>Cadastro IAcai</h2>
      </div>
      
      <div className="chat-messages" style={messagesContainerStyle}>
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`message ${message.sender}`} 
            style={message.sender === 'bot' ? botMessageStyle : userMessageStyle}
          >
            {message.sender === 'bot' && (
              <img src={IAcaiAvatar} alt="IAcai" style={messageBotAvatarStyle} />
            )}
            <div style={message.sender === 'bot' ? botBubbleStyle : userBubbleStyle}>
              {message.text}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="message bot" style={botMessageStyle}>
            <img src={IAcaiAvatar} alt="IAcai" style={messageBotAvatarStyle} />
            <div style={botBubbleStyle}>
              <div className="typing-indicator" style={typingStyle}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          value={currentInput}
          onChange={handleInputChange}
          placeholder="Digite sua resposta..."
          style={inputStyle}
          disabled={isTyping}
        />
        <button 
          type="submit" 
          style={buttonStyle}
          disabled={isTyping || !currentInput.trim()}
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

// Styles
const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  maxWidth: '800px',
  margin: '0 auto',
  backgroundColor: '#f5f5f5',
  borderRadius: '10px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden'
};

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '15px 20px',
  backgroundColor: '#4CAF50',
  color: 'white',
  borderBottom: '1px solid #ddd'
};

const avatarStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  marginRight: '15px',
  objectFit: 'cover'
};

const messagesContainerStyle = {
  flex: 1,
  padding: '20px',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '15px'
};

const botMessageStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: '10px'
};

const userMessageStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: '10px'
};

const messageBotAvatarStyle = {
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  marginRight: '10px'
};

const botBubbleStyle = {
  backgroundColor: '#e9f5e9',
  padding: '12px 15px',
  borderRadius: '18px 18px 18px 0',
  maxWidth: '70%',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
};

const userBubbleStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '12px 15px',
  borderRadius: '18px 18px 0 18px',
  maxWidth: '70%',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
};

const formStyle = {
  display: 'flex',
  padding: '15px',
  borderTop: '1px solid #ddd',
  backgroundColor: 'white'
};

const inputStyle = {
  flex: '1',
  padding: '12px 15px',
  border: '1px solid #ddd',
  borderRadius: '25px',
  outline: 'none',
  fontSize: '15px'
};

const buttonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '25px',
  padding: '0 20px',
  marginLeft: '10px',
  cursor: 'pointer',
  fontSize: '15px',
  fontWeight: 'bold',
  transition: 'background-color 0.3s',
};

const typingStyle = {
  display: 'flex',
  columnGap: '5px',
  padding: '5px 0',
};

export default Appteste;