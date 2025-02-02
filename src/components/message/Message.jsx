import { useState, useEffect, useRef } from "react";
import ContactList from "./ContactList";
import {
  useGetRelatedMessagesQuery,
  useCreateMessageMutation,
} from "../../features/messageFeatures/messageApi";

const Message = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const messageEndRef = useRef(null);

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

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && newMessage.trim()) {
      handleSendMessage();
      setNewMessage("");
    }
  };

  const handleBackToContacts = () => {
    setSelectedContact(null); // Seçili kişiyi sıfırlayarak kişi listesine dön
  };

  useEffect(() => {
    if (relatedMessages && relatedMessages.length > 0) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [relatedMessages]);

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col sm:flex-row bg-zinc-950 text-white">
      {/* Contact List */}
      <div
        className={`
          sm:block ${selectedContact ? "hidden" : "block"} 
          w-full sm:w-full sm:min-w-[320px] max-w-[384px] 
          bg-zinc-950 border-r border-zinc-800/50
        `}
      >
        <ContactList onSelectContact={handleSelectContact} />
      </div>

      {/* Message View */}
      <div
        className={`
          flex-1 flex flex-col bg-gradient-to-b from-zinc-900 to-zinc-950 
          ${selectedContact ? "block" : "hidden sm:block"}
        `}
      >
        {selectedContact ? (
          <>
            {/* Üst Bilgi */}
            <div className="min-h-[64px] px-6 py-4 border-b border-zinc-800/50 flex items-center justify-between bg-zinc-900/50">
              <div className="flex items-center">
                <img
                  src={selectedContact.profilePicture}
                  alt={selectedContact.username}
                  className="w-10 h-10 rounded-full border border-zinc-700"
                />
                <div className="ml-3">
                  <h3 className="font-medium text-zinc-100">
                    {selectedContact.username}
                  </h3>
                </div>
              </div>
              {/* Geri Dön Düğmesi */}
              <button
                onClick={handleBackToContacts}
                className="text-zinc-400 hover:text-white transition-all flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
                <span>Contacts</span>
              </button>
            </div>

            {/* Mesaj Listesi */}
            <div
              className="flex-1 overflow-y-auto p-6 space-y-4 max-h-[calc(100vh-192px)]"
              style={{
                overscrollBehavior: "contain",
                scrollbarWidth: "thin",
                scrollbarColor: "#27272a #09090b",
              }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-500"></div>
                </div>
              ) : isError ? (
                <div className="flex items-center justify-center h-full text-red-400">
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  An error occurred while loading messages
                </div>
              ) : (
                relatedMessages?.map((message, index) => (
                  <div
                    key={index}
                    className={`
                      flex ${
                        message.senderUsername === selectedContact.username
                          ? "justify-start"
                          : "justify-end"
                      }
                    `}
                  >
                    <div
                      className={`
                        max-w-[70%] px-4 py-2 rounded-2xl shadow-lg backdrop-blur-sm
                        ${
                          message.senderUsername === selectedContact.username
                            ? "bg-zinc-800/80 text-zinc-100"
                            : "bg-purple-600 text-white"
                        }
                        ${
                          message.senderUsername === selectedContact.username
                            ? "rounded-tl-sm"
                            : "rounded-tr-sm"
                        }
                      `}
                    >
                      {message.content}
                    </div>
                  </div>
                ))
              )}
              <div ref={messageEndRef} />
            </div>

            {/* Mesaj Gönderme Alanı */}
            <div className="p-4 border-t border-zinc-800/50 bg-zinc-900/50 sm:sticky sm:bottom-0">
              <div className="flex items-center space-x-4">
                <div className="flex-grow">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Mesajınızı yazın..."
                    className="w-full bg-zinc-800/50 text-white placeholder-zinc-500 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className={`
                    p-3 rounded-xl transition-all
                    ${
                      newMessage.trim()
                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                        : "bg-zinc-800/50 text-zinc-600 cursor-not-allowed"
                    }
                  `}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-zinc-900 to-zinc-950">
            <div className="text-center text-zinc-500">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-zinc-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <p className="text-lg">Select a contact to message</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
