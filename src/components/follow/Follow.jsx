const Follow = () => {
  const profiles = [
    { id: 1, name: "Ali Yılmaz", image: "https://picsum.photos/210" },
    { id: 2, name: "Ayşe Demir", image: "https://picsum.photos/230" },
    { id: 3, name: "Mehmet Kaya", image: "https://picsum.photos/200" },
    { id: 4, name: "Ebru Demir", image: "https://picsum.photos/200" },
    { id: 5, name: "Eda Kaya", image: "https://picsum.photos/200" },
    { id: 6, name: "Hatice Kaya", image: "https://picsum.photos/200" },
    { id: 7, name: "Ege Kayaaaaaaaa", image: "https://picsum.photos/200" },
  ];

  return (
    <div className="w-72 fixed top-24 right-5 bg-black shadow-lg rounded-lg p-3">
      <h3 className="text-lg text-white pb-2 border-b border-gray-900">
        follow suggestion
      </h3>
      <ul className="space-y-3">
        {profiles.map((profile) => (
          <li key={profile.id} className="flex items-center gap-3">
            <img
              src={profile.image}
              alt="Profile"
              className="w-9 h-9 rounded-full border-2 border-gray-300 hover:border-gray-400 cursor-pointer"
            />
            <span className="text-white  hover:text-gray-400 font-small flex-1 truncate">
              {profile.name.length > 10
                ? profile.name.slice(0, 10) + "..."
                : profile.name}
            </span>
            <div className="flex flex-col mr-6">
              <button className="bg-black text-blue-500 px-4 py-1 rounded-md text-sm hover:text-blue-600 mb-1">
                Follow
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Follow;
