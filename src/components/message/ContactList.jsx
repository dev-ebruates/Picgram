import { useState } from "react";
import { useGetConversationsQuery } from "../../features/messageFeatures/messageApi";
import { useSearchQuery } from "../../features/searchFeatures/searchApi";

const ContactList = ({ onSelectContact }) => {
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const {
    data: contacts = [],
    isLoading: isLoadingContacts,
    isError: isErrorContacts,
  } = useGetConversationsQuery();

  const {
    data: searchResults,
    isLoading: isLoadingSearch,
    isError: isErrorSearch,
  } = useSearchQuery(searchTerm, {
    skip: !isSearching || searchTerm.length < 2,
  });

  const handleContactSelect = (contact) => {
    const selectedContact = {
      userId: contact.userId || contact.id,
      username: contact.username,
      profilePicture: contact.profilePicture || contact.userProfilePicture,
    };
    
    setSelectedContactId(selectedContact.userId);
    onSelectContact(selectedContact);
    setIsSearching(false);
    setSearchTerm("");
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsSearching(value.length >= 2);
  };

  if (isLoadingContacts && !isSearching) {
    return (
      <div className="min-w-[320px] max-w-[384px] w-1/4 bg-black border-r border-gray-800 text-white flex items-center justify-center">
        Yükleniyor...
      </div>
    );
  }

  if (isErrorContacts && !isSearching) {
    return (
      <div className="min-w-[320px] max-w-[384px] w-1/4 bg-black border-r border-gray-800 text-white flex items-center justify-center">
        Hata oluştu
      </div>
    );
  }

  const displayList = isSearching ? (searchResults || []) : (contacts || []);

  return (
    <div className="min-w-[320px] max-w-[384px] w-1/4 bg-black border-r border-gray-800 text-white flex flex-col">
      <div className="min-h-[116px] p-4 border-b border-gray-800">
        <h2 className="text-xl font-semibold text-white mb-4">Mesajlar</h2>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Kullanıcı ara..."
            className="w-full bg-gray-900 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {isLoadingSearch && searchTerm.length >= 2 && (
            <div className="absolute right-3 top-2.5 text-gray-400">
              Aranıyor...
            </div>
          )}
        </div>
      </div>
      <div
        className="flex-grow overflow-y-auto min-h-0"
        style={{
          overscrollBehavior: "contain",
          scrollbarWidth: "thin",
          scrollbarColor: "#374151 #000000",
        }}
      >
        <div className="divide-y divide-gray-800">
          {isSearching && searchTerm.length >= 2 && (!searchResults || searchResults.length === 0) ? (
            <div className="p-4 text-center text-gray-500">
              Kullanıcı bulunamadı
            </div>
          ) : (
            displayList.map((contact) => (
              <div
                key={contact.userId || contact.id}
                className={`
                  flex items-center p-4 cursor-pointer hover:bg-gray-900 transition
                  ${selectedContactId === (contact.userId || contact.id) ? "bg-gray-900" : ""}
                `}
                onClick={() => handleContactSelect(contact)}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={
                      contact.profilePicture || contact.userProfilePicture || "https://via.placeholder.com/50"
                    }
                    alt={contact.username}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-white truncate">
                      {contact.username}
                    </h3>
                    {!isSearching && (
                      <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                        {contact.lastMessageTime}
                      </span>
                    )}
                  </div>
                  {!isSearching && (
                    <p className="text-sm text-gray-400 truncate">
                      {contact.lastMessage}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactList;
