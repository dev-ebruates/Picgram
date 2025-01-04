import { useState } from 'react';
import MessageList from './MessageList';

const Message = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
    // Burada gerçek bir uygulamada API çağrısı ile mesajlar çekilecek
    setMessages([
      { id: 1, sender: contact.username, text: 'Merhaba!', time: '14:30' },
      { id: 2, sender: 'ben', text: 'Nasılsın?', time: '14:31' },
    ]);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedContact) {
      const message = {
        id: messages.length + 1,
        sender: 'ben',
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex w-full h-[calc(100vh-80px)] bg-black text-white border-none rounded-xl overflow-hidden">
      <MessageList onSelectContact={handleSelectContact} />
      
      {selectedContact ? (
        <div className="flex-grow flex flex-col">
          {/* Mesaj Başlığı */}
          <div className="flex items-center p-4 border-b border-gray-800">
            <img 
              src={selectedContact.profilePic} 
              alt={selectedContact.name} 
              className="w-10 h-10 rounded-full mr-4"
            />
            <span>{selectedContact.name}</span>
      
          </div>
          
          {/* Mesaj Listesi */}
          <div className="flex-grow overflow-y-auto p-4 space-y-3 bg-black">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === 'ben' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`
                  max-w-[70%] p-3 rounded-xl relative
                  ${msg.sender === 'ben' 
                    ? 'bg-blue-700 text-white' 
                    : 'bg-gray-800 text-white'}
                `}>
                  {msg.text}
                  <span className={`
                    text-[10px] absolute -bottom-4 
                    ${msg.sender === 'ben' 
                      ? 'text-blue-300 right-0' 
                      : 'text-gray-500 left-0'}
                  `}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mesaj Girişi */}
          <div className="flex p-4 border-t border-gray-800 bg-black">
            <input 
              type="text" 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Bir mesaj yazın..."
              className="flex-grow px-4 py-2 bg-gray-800 text-white rounded-full mr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={handleSendMessage}
              className="bg-blue-700 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-grow flex items-center justify-center text-gray-500 bg-black">
          Bir sohbet seçin
        </div>
      )}
    </div>
  );
};

export default Message;
