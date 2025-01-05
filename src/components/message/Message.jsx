import { useState } from "react";
import ContactList from "./ContactList";
import {
  useGetRelatedMessagesQuery,
  useCreateMessageMutation,
} from "../../features/messageFeatures/messageApi";

const Message = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const {
    data: relatedMessages,
    isLoading,
    isError,
  } = useGetRelatedMessagesQuery(selectedContact?.userId, {
    skip: !selectedContact,
  });
  const [createMessage] = useCreateMessageMutation();

  const handleSelectContact = async (contact) => {
    await setSelectedContact(contact);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedContact) {
      createMessage({
        receiverUserId: selectedContact.userId,
        content: newMessage,
      });
      setNewMessage("");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] max-h-[calc(100vh-64px)] flex bg-black text-white overflow-hidden">
      <ContactList onSelectContact={handleSelectContact} />

      {selectedContact ? (
        <div className="flex-grow flex flex-col min-h-full max-h-full">
          {/* Mesaj başlığı */}
          <div className="min-h-[64px] p-4 border-b border-gray-800 flex items-center">
            <img
              src={
                selectedContact.profilePicture ||
                "https://via.placeholder.com/50"
              }
              alt={selectedContact.username}
              className="w-10 h-10 rounded-full mr-4"
            />
            <h2 className="text-xl font-semibold truncate">
              {selectedContact.username}
            </h2>
          </div>

          {/* Mesaj listesi */}
          <div
            className="flex-grow overflow-y-auto p-4 min-h-0"
            style={{
              overscrollBehavior: "contain",
              scrollbarWidth: "thin",
              scrollbarColor: "#374151 #000000",
            }}
          >
            {isLoading ? (
              <div className="text-center text-gray-500">
                Mesajlar yükleniyor...
              </div>
            ) : isError ? (
              <div className="text-center text-red-500">
                Mesajlar yüklenirken hata oluştu
              </div>
            ) : (
              relatedMessages?.map((message, index) => (
                <div
                  key={index}
                  className={`
                    mb-4 max-w-[70%] 
                    ${
                      message.senderUsername === selectedContact.username
                        ? "bg-gray-800 text-white self-start"
                        : "bg-blue-600 text-white self-end ml-auto"
                    }
                    p-3 rounded-lg
                  `}
                >
                  {message.content}
                  <div className="text-xs text-gray-400 mt-1 text-right">
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Mesaj gönderme alanı */}
          <div className="min-h-[64px] p-4 border-t border-gray-800 flex items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Bir mesaj yazın..."
              className="flex-grow bg-gray-900 text-white p-2 rounded-l-lg focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="bg-gray-600 text-white p-2 rounded-r-lg hover:bg-gray-700"
            >
              <i className="fas fa-paper-plane "></i>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-grow flex items-center justify-center text-gray-500">
          Bir sohbet seçin
        </div>
      )}
    </div>
  );
};

export default Message;
