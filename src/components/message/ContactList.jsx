import { useState } from "react";
import { useGetConversationsQuery } from "../../features/messageFeatures/messageApi";

const ContactList = ({ onSelectContact }) => {
  const [selectedContactId, setSelectedContactId] = useState(null);
  const {
    data: contacts = [],
    isLoading,
    isError,
  } = useGetConversationsQuery();

  const handleContactSelect = (contact) => {
    setSelectedContactId(contact.userId);
    onSelectContact(contact);
  };

  if (isLoading) {
    return (
      <div className="w-96 bg-black border-r border-gray-800 text-white flex items-center justify-center">
        Yükleniyor...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-96 bg-black border-r border-gray-800 text-white flex items-center justify-center">
        Hata oluştu
      </div>
    );
  }

  return (
    <div className="w-96 bg-black border-r border-gray-800 text-white flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-xl font-semibold text-white">Mesajlar</h2>
      </div>
      <div
        className="flex-grow overflow-y-auto"
        style={{
          overscrollBehavior: "contain",
          scrollbarWidth: "thin",
          scrollbarColor: "#374151 #000000",
        }}
      >
        <div className="divide-y divide-gray-800">
          {contacts.map((contact) => (
            <div
              key={contact.userId}
              className={`
                flex items-center p-4 cursor-pointer hover:bg-gray-900 transition
                ${selectedContactId === contact.userId ? "bg-gray-900" : ""}
              `}
              onClick={() => handleContactSelect(contact)}
            >
              <div className="relative">
                <img
                  src={
                    contact.profilePicture || "https://via.placeholder.com/50"
                  }
                  alt={contact.username}
                  className="w-12 h-12 rounded-full mr-4"
                />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-white">
                    {contact.username}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {/* Son mesaj zamanı eklenecek */}
                  </span>
                </div>
                <p className="text-sm text-gray-400 truncate">
                  {/* Son mesaj içeriği eklenecek */}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactList;
