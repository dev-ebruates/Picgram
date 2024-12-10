import Header from "../components/Header/Header";
import { useEffect, useState } from "react";
import Modal from "../components/modal/modal.jsx";
import PostForm from "../components/postFrom/PostForm.jsx";
import { getAllByUserId } from "../services/postServices.js";

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [userInfo, setUserInfo] = useState({
    username: "",
    fullname: "",
    bio: "",
    followers: 0,
    following: 0,
    profileImage: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getAllByUserId();
        const posts = response.data;

        if (posts && posts.length > 0) {
          setUserPosts(posts);
  
          setUserInfo({
            username: posts[0].username || "",
            fullname: posts[0].fullname || "",
            bio: posts[0].bio || "",
            followers: posts[0].followers || 0,
            following: posts[0].following || 0,
            profileImage: posts[0].userProfilePicture || "",
          });
        } else {
          console.warn("Boş bir veri seti döndü.");
        }
      } catch (error) {
        console.error("Veri çekilirken bir hata oluştu:", error);
      }
    };
  
    fetchUserData();
  }, []);
  
  const handleCreateClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePostSubmit = (newPost) => {
    console.log("Yeni gönderi oluşturuldu:", newPost);
    handleCloseModal();
  };


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
                  src={userInfo.profileImage ? userInfo.profileImage :"https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-gray-600"
                />
                <div className="flex justify-center">
                  <div>
                    <h2 className="text-3xl font-semibold">{userInfo.username}</h2>
                    <p className="text-sm">{userInfo.fullname}</p>
                    <p className="text-sm">{userInfo.bio}</p>
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
            {/* Yeni Gönderi Ekle Butonu */}
            <button
              className="text-white px-6 py-2 mt-10 bg-gray-600 rounded-full mb-6 hover:bg-blue-500 "
              onClick={handleCreateClick}
            >
              New post
            </button>
            <div className="grid grid-cols-3 gap-2 w-full mr-10">
              {userPosts.map((item, index) => (
                <div
                  key={index}
                  className="bg-black border border-gray-900 rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={item.mediaUrl}
                    alt="UserPost"
                    className="w-full h-49 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <PostForm onSubmit={handlePostSubmit} />
      </Modal>
    </div>
  );
};

export default ProfilePage;
