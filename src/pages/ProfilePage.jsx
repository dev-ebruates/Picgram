import Header from "../components/Header/Header";
import { useState } from "react";
import Modal from "../components/modal/modal.jsx";
import PostForm from "../components/postForm/PostForm.jsx";
import { useUpdateUserBioMutation, useUpdateUserProfilePictureMutation } from "../features/userFeatures/userApi.js";
import {
  useGetProfileQuery,
  useGetMyProfileQuery,
} from "../features/userFeatures/userApi.js";
import { useGetAllByUsernameQuery, useDeletePostMutation } from "../features/postFeatures/postApi";
import { useParams } from "react-router-dom";
import profilePicture from "../images/profilePicture.jpg"


const ProfilePage = () => {
  const params = useParams(); // URL'den parametreleri al
  const username = params.username; // URL'den kullanıcı adını al
  const { data: myProfile } = useGetMyProfileQuery();
  const currentUser = myProfile?.data;

  const isOwnProfile = !username || currentUser?.username === username; // Kendi profilimi mi kontrol et

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);

  const [updateUserBioMutation] = useUpdateUserBioMutation();
  const [updateUserProfilePictureMutation] = useUpdateUserProfilePictureMutation();
  const [deletePostMutation] = useDeletePostMutation(); // Silme mutation'ı tanımlandı
  const { refetch } = useGetAllByUsernameQuery(username || currentUser?.username);
  //refecth fonksiyonunu kullanarak gönderileri yeniden yükle

  const myProfileQuery = useGetMyProfileQuery();
  const userProfileQuery = useGetProfileQuery(username);
  const [mediaUrl, setMediaUrl] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ProfilePictureData = {
        profilePicture: mediaUrl
      };
      await updateUserProfilePictureMutation(ProfilePictureData).unwrap();
      myProfileQuery.refetch(); // Profili yeniden yükle
      setIsProfileModalOpen(false);
      setMediaUrl("");
    } catch (error) {
      console.error('Profil resmi eklenirken hata oluştu:', error);
    }
  };

  const handleCancel = () => {
    setIsProfileModalOpen(false);
    setMediaUrl("");
  };

  const confirmDelete = async (postId) => {
    try {
      await deletePostMutation(postId).unwrap(); // Post silme işlemi
      await refetch();// Gönderi listesini yeniden yükle
      setShowDeleteModal(false); // Modalı kapat
    } catch (error) {
      console.error("Gönderi silinirken hata oluştu:", error);
    }
  };

  const handleDeletePost = (postId) => { // Silme işlemi
    setPostIdToDelete(postId);
    setShowDeleteModal(true); // Onay modalını göster
  };

  if (getProfileLoading) return <div>Yükleniyor...</div>;
  if (!profile?.data) return <div>Profil bulunamadı</div>;

  return (
    <div className="flex h-screen">
      <div className="w-[190px] bg-white">
        {/* Header İçeriği */}
        <div>
          <Header />
        </div>
      </div>

      {/* Sağ taraf: Profil */}
      <div className="flex-1 bg-white ml-20">
        {/* Profil İçeriği */}
        <div>
          <div className="flex flex-col bg-black text-white min-h-screen">
            {/* Profil Başlığı */}
            <div className="flex items-center space-x-8 mt-6">
              <img
                src={
                  profile?.data?.userProfilePicture
                    ? profile?.data?.userProfilePicture
                    : profilePicture
                }
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-gray-600"
                onClick={isOwnProfile ? () => setIsProfileModalOpen(true) : undefined}
              />
              <div>
                <h2 className="text-3xl font-semibold">
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
            <div className="flex flex-col items-center px-20">
              {/* Takipçi Bilgileri */}
              <div className="w-full mr-10 flex justify-around p-6 mb-10 border-b border-gray-900">
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
                  className="text-white px-6 py-2 mt-10 bg-gray-600 rounded-full mb-6 hover:bg-blue-500"
                  onClick={() => setIsModalOpen(true)}
                >
                  New post
                </button>
              )}
              <div className="grid grid-cols-3 gap-2 w-full mr-10">
                {posts?.map((item, index) => (
                  <div
                    key={index}
                    className="relative bg-black border border-gray-900 rounded-lg shadow-md overflow-hidden"
                    style={{ width: "100%", height: "300px" }}
                  >
                    <img
                      src={item.mediaUrl}
                      alt="UserPost"
                      className="w-full h-full object-cover"
                    />
                    {isOwnProfile && (
                      <button
                        className="absolute top-2 right-2  text-white rounded-full p-2 bg-gray-700"
                        onClick={() => handleDeletePost(item.id)}
                      >
                        <i className="fas fa-trash-alt "></i>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-[500px]">
            <h2 className="text-xl font-bold mb-4 text-white">Profile Picture Add</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="w-full flex justify-center mb-6">
                <img
                  src={mediaUrl || profilePicture}
                  alt="Create Post"
                  className={`w-full h-full object-cover ${mediaUrl ? '' : 'rounded-full'} overflow-hidden border-4 border-gray-800`}
                  style={{
                    width: "250px",
                    height: "250px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="media"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Media URL:
                </label>
                <input
                  type="text"
                  id="media"
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  placeholder="Media URL'ini girin"
                  className="mt-2 block w-full rounded-md bg-gray-500 border-gray-600 text-white shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm py-2 px-3 border border-transparent"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 transition-colors duration-300"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isOwnProfile && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <PostForm handleCloseModal={() => setIsModalOpen(false)} />
        </Modal>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-[500px]">
            <h2 className="text-xl font-bold mb-4 text-white">Are you sure you want to delete?</h2>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors duration-300"
              >
                No
              </button>
              <button
                type="button"
                onClick={() => {
                  confirmDelete(postIdToDelete);
                  setShowDeleteModal(false);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors duration-300"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
