import React, { useState } from 'react';

const contacts = [
  { 
    id: 1, 
    username: 'john_doe', 
    name: 'John Doe', 
    profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
    lastMessage: 'Merhaba, nasılsın?'
  },
  { 
    id: 2, 
    username: 'jane_smith', 
    name: 'Jane Smith', 
    profilePic: 'https://randomuser.me/api/portraits/women/1.jpg',
    lastMessage: 'Bugün görüşelim mi?'
  },
  { 
    id: 3, 
    username: 'mike_brown', 
    name: 'Mike Brown', 
    profilePic: 'https://randomuser.me/api/portraits/men/2.jpg',
    lastMessage: 'Proje hakkında konuşalım.'
  },
  { 
    id: 4, 
    username: 'emily_wilson', 
    name: 'Emily Wilson', 
    profilePic: 'https://randomuser.me/api/portraits/women/2.jpg',
    lastMessage: 'Toplantı notlarını paylaşabilir misin?'
  },
  { 
    id: 5, 
    username: 'alex_johnson', 
    name: 'Alex Johnson', 
    profilePic: 'https://randomuser.me/api/portraits/men/3.jpg',
    lastMessage: 'Hafta sonu planın ne?'
  },
  { 
    id: 6, 
    username: 'sarah_miller', 
    name: 'Sarah Miller', 
    profilePic: 'https://randomuser.me/api/portraits/women/3.jpg',
    lastMessage: 'Yeni projeyi konuştuk mu?'
  },
  { 
    id: 7, 
    username: 'david_clark', 
    name: 'David Clark', 
    profilePic: 'https://randomuser.me/api/portraits/men/4.jpg',
    lastMessage: 'Raporu tamamladım.'
  }
];

const MessageList = ({ onSelectContact }) => {
  const [selectedContactId, setSelectedContactId] = useState(null);

  const handleContactSelect = (contact) => {
    setSelectedContactId(contact.id);
    onSelectContact(contact);
  };

  return (
    <div className="w-96 bg-black border-r border-gray-800 text-white flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-xl font-semibold text-white">Mesajlar</h2>
      </div>
      <div className="flex-grow overflow-y-auto" style={{
        overscrollBehavior: 'contain',
        scrollbarWidth: 'thin',
        scrollbarColor: '#374151 #000000'
      }}>
        <div className="divide-y divide-gray-800">
          {contacts.map((contact) => (
            <div 
              key={contact.id} 
              className={`
                flex items-center p-4 cursor-pointer hover:bg-gray-900 transition
                ${selectedContactId === contact.id ? 'bg-gray-900' : ''}
              `}
              onClick={() => handleContactSelect(contact)}
            >
              <div className="relative">
                <img 
                  src={contact.profilePic} 
                  alt={contact.name} 
                  className="w-12 h-12 rounded-full mr-4"
                />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-white">{contact.name}</h3>
                  <span className="text-xs text-gray-500">14:30</span>
                </div>
                <p className="text-sm text-gray-400 truncate">
                  {contact.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessageList;
