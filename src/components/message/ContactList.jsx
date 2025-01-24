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
      <div className="min-w-[320px] max-w-[384px] w-1/4 bg-zinc-950 border-r border-zinc-800/50 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-500"></div>
      </div>
    );
  }

  if (isErrorContacts && !isSearching) {
    return (
      <div className="min-w-[320px] max-w-[384px] w-1/4 bg-zinc-950 border-r border-zinc-800/50 text-white flex items-center justify-center">
        <div className="text-red-400 flex items-center">
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
         
        </div>
      </div>
    );
  }

  const displayList = isSearching ? searchResults || [] : contacts || [];

  return (
    <div className="min-w-[320px] max-w-[384px] w-1/4 bg-zinc-950 border-r border-zinc-800/50 text-white flex flex-col">
      <div className=" p-6 border-b border-zinc-800/50 bg-zinc-900/50 ">
        <h2 className="text-2xl font-bold text-zinc-100 mb-4">Messages</h2>
        <div className="">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Users search..."
            className="w-full bg-zinc-800/50 text-white placeholder-zinc-500 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          />
        
          {isLoadingSearch && searchTerm.length >= 2 && (
            <div className="absolute right-3 top-2.5">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-zinc-500"></div>
            </div>
          )}
        </div>
      </div>
      <div
        className="flex-grow overflow-y-auto min-h-0 bg-gradient-to-b from-zinc-900 to-zinc-950"
        style={{
          overscrollBehavior: "contain",
          scrollbarWidth: "thin",
          scrollbarColor: "#27272a #09090b",
        }}
      >
        <div className="divide-y divide-zinc-800/50">
          {isSearching &&
          searchTerm.length >= 2 &&
          (!searchResults || searchResults.length === 0) ? (
            <div className="p-6 text-center">
              <svg
                className="w-12 h-12 mx-auto mb-3 text-zinc-600"
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
              <p className="text-zinc-500">User not found</p>
            </div>
          ) : (
            displayList.map((contact) => (
              <div
                key={contact.userId || contact.id}
                className={`
                  flex items-center p-4 cursor-pointer transition-all
                  hover:bg-zinc-800/40
                  ${
                    selectedContactId === (contact.userId || contact.id)
                      ? "bg-zinc-800/60 hover:bg-zinc-800/60"
                      : ""
                  }
                `}
                onClick={() => handleContactSelect(contact)}
              >
                <div className="relative">
                  <img
                    src={
                      contact.profilePicture 
                    }
                    alt={contact.username}
                    className={`
                      w-12 h-12 rounded-full mr-4
                      ${
                        selectedContactId === (contact.userId || contact.id)
                          ? "border-2 border-blue-500"
                          : "border border-zinc-700"
                      }
                    `}
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="font-medium text-zinc-100 truncate">
                    {contact.username}
                  </h3>
                </div>
                <div className="ml-4 flex flex-col items-end">
                  {/* <span className="text-xs text-zinc-500">14:30</span> */}
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
