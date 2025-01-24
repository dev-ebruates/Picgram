import { useState } from "react";
import Modal from "../components/modal/modal.jsx";
import PostForm from "../components/postForm/PostForm.jsx";
import {
  useUpdateUserBioMutation,
  useUpdateUserProfilePictureMutation,
} from "../features/userFeatures/userApi.js";
import {
  useGetProfileQuery,
  useGetMyProfileQuery,
} from "../features/userFeatures/userApi.js";
import {
  useGetAllByUsernameQuery,
  useDeletePostMutation,
} from "../features/postFeatures/postApi";
import { useParams } from "react-router-dom";
import profilePicture from "../images/profilePicture.jpg";

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
  const [updateUserProfilePictureMutation] =
    useUpdateUserProfilePictureMutation();
  const [deletePostMutation] = useDeletePostMutation(); // Silme mutation'ı tanımlandı
  const { refetch } = useGetAllByUsernameQuery(
    username || currentUser?.username
  );
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
        profilePicture: mediaUrl,
      };
      await updateUserProfilePictureMutation(ProfilePictureData).unwrap();
      myProfileQuery.refetch(); // Profili yeniden yükle
      setIsProfileModalOpen(false);
      setMediaUrl("");
    } catch (error) {
      console.error("Profil resmi eklenirken hata oluştu:", error);
    }
  };

  const handleCancel = () => {
    setIsProfileModalOpen(false);
    setMediaUrl("");
  };

  const confirmDelete = async (postId) => {
    try {
      await deletePostMutation(postId).unwrap(); // Post silme işlemi
      await refetch(); // Gönderi listesini yeniden yükle
      setShowDeleteModal(false); // Modalı kapat
    } catch (error) {
      console.error("Gönderi silinirken hata oluştu:", error);
    }
  };

  const handleDeletePost = (postId) => {
    // Silme işlemi
    setPostIdToDelete(postId);
    setShowDeleteModal(true); // Onay modalını göster
  };

  if (getProfileLoading) return <div>Yükleniyor...</div>;
  if (!profile?.data) return <div>Profil bulunamadı</div>;

  return (
    <div className="flex h-screen">
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
                onClick={
                  isOwnProfile ? () => setIsProfileModalOpen(true) : undefined
                }
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
              <div className="grid grid-cols-3 gap-4 w-full mr-10">
                {posts?.map((item, index) => (
                  <div
                    key={index}
                    className="relative group aspect-square bg-black border border-gray-800/50 rounded-lg overflow-hidden"
                  >
                    <img
                      src={item.mediaUrl}
                      alt="UserPost"
                      className="w-full h-full object-cover"
                    />
                    {isOwnProfile && (
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          className="absolute top-3 right-3 text-white p-2 rounded-lg bg-gray-500/80 
                          hover:bg-gray-600/80 transition-colors duration-300"
                          onClick={() => handleDeletePost(item.id)}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
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
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-20 z-[9999]">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 w-[400px] shadow-2xl border border-gray-700/50">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Profil Picture
              </h2>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <i className="fas fa-times text-lg"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="w-full flex justify-center mb-4 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                <img
                  src={mediaUrl || profilePicture}
                  alt="Create Post"
                  className="relative w-[180px] h-[180px] object-cover rounded-full border-4 border-gray-700 shadow-xl hover:border-gray-600 transition-all duration-300"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="media"
                  className="block text-sm font-medium text-gray-300"
                >
                  Media URL
                </label>
                <input
                  type="text"
                  id="media"
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  placeholder="Enter media URL"
                  className="w-full px-3 py-2 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-sm"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-blue-600 hover:to-purple-600 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isOwnProfile && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          style={{ zIndex: 1000 }}
        >
          <PostForm handleCloseModal={() => setIsModalOpen(false)} />
        </Modal>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900/90 rounded-lg p-6 w-[400px] border border-gray-800/50 shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
              Delete Post
            </h2>
            <p className="text-gray-300 mb-6">Are you sure you want to delete this post?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-800/80 text-white rounded-lg border border-gray-700/50
                hover:bg-gray-700/80 transition-all duration-300 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmDelete(postIdToDelete)}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white 
                font-medium hover:from-blue-600 hover:to-purple-600 focus:ring-2 focus:ring-purple-500/20 
                transition-all duration-300 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
