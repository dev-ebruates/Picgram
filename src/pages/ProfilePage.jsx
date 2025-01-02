import Header from "../components/header/Header";
import { useState, useEffect } from "react";
import Modal from "../components/modal/modal.jsx";
import PostForm from "../components/postForm/PostForm.jsx";
import { useUpdateUserBioMutation } from "../features/userFeatures/userApi.js";
import {
  useGetProfileQuery,
  useGetMyProfileQuery,
} from "../features/userFeatures/userApi.js";
import { useGetAllByUsernameQuery } from "../features/postFeatures/postApi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const params = useParams(); // URL'den parametreleri al
  const username = params.username; // URL'den kullanıcı adını al
  const { data: myProfile } = useGetMyProfileQuery();
  const currentUser = myProfile?.data;

  const isOwnProfile = !username || currentUser?.username === username; // Kendi profilimi mi kontrol et

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [updateUserBioMutation] = useUpdateUserBioMutation();

  const myProfileQuery = useGetMyProfileQuery();
  const userProfileQuery = useGetProfileQuery(username);

  const profile = isOwnProfile ? myProfileQuery.data : userProfileQuery.data;

  const getProfileLoading = isOwnProfile
    ? myProfileQuery.isLoading
    : userProfileQuery.isLoading;
  const [newBio, setNewBio] = useState(profile?.data?.bio);

  const {
    data: posts,
    isLoading: postsLoading,
    error: postsError,
  } = useGetAllByUsernameQuery(username || currentUser?.username);

  if (postsLoading) return <div>Yükleniyor...</div>;
  if (postsError) return <div>Hata: {postsError}</div>;

  const handleBioUpdate = async () => {
    try {
      await updateUserBioMutation({ bio: newBio });
      myProfileQuery.refetch(); // Profili yeniden yükle
      setIsEditing(false);
    } catch (error) {
      console.error("Biyografi güncellenirken hata oluştu:", error);
    }
  };

  if (getProfileLoading) return <div>Yükleniyor...</div>;
  if (!profile?.data) return <div>Profil bulunamadı</div>;

  return (
    <div className="flex h-screen ">
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
          <div className="flex flex-col  bg-black text-white min-h-screen">
            {/* Profil Başlığı */}
            <div className="flex items-center space-x-8 mt-6">
              <img
                src={
                  profile?.data?.userProfilePicture
                    ? profile?.data?.userProfilePicture
                    : "https://via.placeholder.com/150"
                }
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-gray-600"
              />
              <div>
                <h2 className="text-3xl font-semibold ">
                  {profile?.data?.username}
                </h2>
                <p className="text-sm">{profile?.data?.fullname}</p>
                <div className="flex items-center space-x-2">
                  {isEditing ? (
                    <div className="flex items-center space-x-2">
                      <textarea
                        type="text"
                        value={newBio}
                        onChange={(e) => setNewBio(e.target.value)}
                        className="px-2 py-1 text-sm border border-gray-600 rounded bg-gray-800 text-white w-full max-w-[400px] resize-none focus:outline-none"
                        rows=""
                      />
                      <button
                        className="h-7 w-7 text-sm text-white bg-blue-600 rounded hover:bg-blue-500 fas fa-check "
                        onClick={() => handleBioUpdate()}
                      ></button>
                      <button
                        className="h-7 w-7 text-sm text-white rounded bg-gray-800 hover:bg-gray-600 fas fa-times "
                        onClick={() => setIsEditing(false)}
                      ></button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 ml-auto">
                      <p className="text-sm max-w-[700px]">
                        {profile?.data?.bio}
                      </p>
                      {isOwnProfile && (
                        <button
                          className="text-gray-400 hover:text-white"
                          onClick={() => {
                            setNewBio(profile?.data?.bio);
                            setIsEditing(true);
                          }}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center  px-20">
              {/* Takipçi Bilgileri */}
              <div className="w-full mr-10 flex justify-around p-6 mb-10 border-b border-gray-900 ">
                <div className="text-center">
                  <p className="text-l font-medium">{posts?.length || 0}</p>
                  <p className="text-sm text-gray-400">posts</p>
                </div>
                <div className="text-center">
                  <p className="text-l font-medium">
                    {profile?.data?.followers || 0}
                  </p>
                  <p className="text-sm text-gray-400">followers</p>
                </div>
                <div className="text-center">
                  <p className="text-l font-medium">
                    {profile?.data?.following || 0}
                  </p>
                  <p className="text-sm text-gray-400">following</p>
                </div>
              </div>
              {/* Yeni Gönderi Ekle Butonu */}
              {isOwnProfile && (
                <button
                  className="text-white px-6 py-2 mt-10 bg-gray-600 rounded-full mb-6 hover:bg-blue-500 "
                  onClick={() => setIsModalOpen(true)}
                >
                  New post
                </button>
              )}
              <div className="grid grid-cols-3 gap-2 w-full mr-10">
                {posts?.map((item, index) => (
                  <div
                    key={index}
                    className="bg-black border border-gray-900 rounded-lg shadow-md overflow-hidden "
                    style={{ width: "100%", height: "300px" }}
                  >
                    <img
                      src={item.mediaUrl}
                      alt="UserPost"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOwnProfile && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <PostForm handleCloseModal={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default ProfilePage;
