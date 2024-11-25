import Header from "../components/Header/Header";


const ProfilePage = () => {
  const images = [
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
   
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
    "https://picsum.photos/200",
  ];

  //   {
  //     username: "dogancem",
  //     time: "30m",
  //     content: "First post!",
  //     profileImage: "https://picsum.photos/200/300",
  //     image: "https://picsum.photos/200",
  //     location: "Istanbul, Turkey",
  //   },
  //   {
  //     username: "dogancem",
  //     time: "30m",
  //     content: "First post!",
  //     profileImage: "https://picsum.photos/200",
  //     image: "https://picsum.photos/200",
  //     location: "Istanbul, Turkey",
  //   },
  //   {
  //     username: "dogancem",
  //     time: "30m",
  //     content: "First post!",
  //     profileImage: "https://picsum.photos/200",
  //     image: "https://picsum.photos/200",
  //     location: "Istanbul, Turkey",
  //   },
  //   {
  //     username: "dogancem",
  //     time: "30m",
  //     content: "First post!",
  //     profileImage: "https://picsum.photos/200",
  //     image: "https://picsum.photos/200",
  //     location: "Istanbul, Turkey",
  //   },
  //   {
  //     username: "dogancem",
  //     time: "30m",
  //     content: "First post!",
  //     profileImage: "https://picsum.photos/200",
  //     image: "https://picsum.photos/200",
  //     location: "Istanbul, Turkey",
  //   },
  //   {
  //     username: "dogancem",
  //     time: "30m",
  //     content: "First post!",
  //     profileImage: "https://picsum.photos/200",
  //     image: "https://picsum.photos/200",
  //     location: "Istanbul, Turkey",
  //   },
  //   {
  //     username: "dogancem",
  //     time: "30m",
  //     content: "First post!",
  //     profileImage: "https://picsum.photos/200",
  //     image: "https://picsum.photos/200",
  //     location: "Istanbul, Turkey",
  //   },
  //   {
  //     username: "dogancem",
  //     time: "30m",
  //     content: "First post!",
  //     profileImage: "https://picsum.photos/200",
  //     image: "https://picsum.photos/200",
  //     location: "Istanbul, Turkey",
  //   },
  //   {
  //     username: "dogancem",
  //     time: "30m",
  //     content: "First post!",
  //     profileImage: "https://picsum.photos/200",
  //     image: "https://picsum.photos/200",
  //     location: "Istanbul, Turkey",
  //   },
  //   {
  //     username: "dogancem",
  //     time: "30m",
  //     content: "First post!",
  //     profileImage: "https://picsum.photos/200",
  //     image: "https://picsum.photos/200",
  //     location: "Istanbul, Turkey",
  //   },
  // ];

  return (
    <div className="flex h-screen">
      <div className="w-[190px] bg-white">
        {/* Header İçeriği */}
        <div>
          <Header />
        </div>
      </div>

      {/* Sağ taraf: Profil */}
      <div className="flex-1 bg-white ml-20 ">
        {/* Profil İçeriği */}
        <div>
          <div className="flex flex-col items-center bg-black text-white min-h-screen">
            {/* Profil Başlığı */}
            <div className="w-full flex justify-between items-center p-6">
              <div className="flex items-center space-x-4">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-gray-600"
                />
                <div className="flex justify-center">
                  <div>
                    <h2 className="text-3xl font-semibold">ebru</h2>
                    <p className="text-sm">Ebru Kayadelen Ateş</p>
                    <p className="text-sm">ziyan olduk ziyadesiyle</p>
                  </div>
                  <div>
                    <button className="text-sm px-4 py-2 border-gray-600  rounded-lg bg-gray-600 hover:bg-gray-800">
                      Edit profile
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Takipçi Bilgileri */}
            <div className="w-full mr-10 flex justify-around p-6 mb-10 border-b border-gray-900 ">
              <div className="text-center">
                <p className="text-l font-medium">0</p>
                <p className="text-sm text-gray-400">posts</p>
              </div>
              <div className="text-center">
                <p className="text-l font-medium">119</p>
                <p className="text-sm text-gray-400">followers</p>
              </div>
              <div className="text-center">
                <p className="text-l font-medium">205</p>
                <p className="text-sm text-gray-400">following</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 w-full mr-10" >
              {images.map((image, index) => (
                <div
                  key={index}
                  className="bg-black border border-gray-900 rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    className="w-full h-48 object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Yeni Gönderi Ekle Butonu */}
            <button className="text-white px-6 py-2 bg-blue-600 rounded-full mb-6 hover:bg-blue-500">
              New post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
