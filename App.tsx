import React, { useState } from 'react';
import { ChatMessage, MessageAuthor } from './types';
import { getEliasResponse } from './services/geminiService';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import InputBar from './components/InputBar';
import WelcomeScreen from './components/WelcomeScreen';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      text,
      author: MessageAuthor.USER,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const advice = await getEliasResponse(text);
      const aiMessage: ChatMessage = {
        id: Date.now() + 1,
        text: advice,
        author: MessageAuthor.AI,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage = 'Meu amor, parece que estou com a cabeça um pouco cheia e não consigo responder agora. Tente me mandar outra mensagem daqui a pouco.';
      setError(errorMessage);
       const aiError: ChatMessage = {
        id: Date.now() + 1,
        text: errorMessage,
        author: MessageAuthor.AI,
      };
      setMessages((prev) => [...prev, aiError]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-rose-100 to-teal-100 min-h-screen flex flex-col items-center justify-center p-4 text-gray-800">
      <div className="w-full max-w-2xl h-[90vh] bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-white/30">
        <Header />
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <WelcomeScreen />
          ) : (
            <ChatWindow messages={messages} isLoading={isLoading} />
          )}
        </div>
        <InputBar onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
       <footer className="text-center mt-4 text-xs text-gray-500">
        <p>Um cantinho digital para matar as saudades. Com amor do teu programador, Elias.</p>
      </footer>
    </div>
  );
};

export default App;