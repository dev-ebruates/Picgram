import { useState, useEffect } from "react";
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
import { useParams, useLocation } from "react-router-dom";
import profilePicture from "../images/profilePicture.jpg";
import { useRef } from "react";
import { useCreatePictureMutation } from "../features/pictureFeatures/pictureApi";

const ProfilePage = () => {
  const location = useLocation();
  const params = useParams();
  const username = params.username;
  const fileInputRef = useRef(null); // Dosya input referansı
  const { data: myProfile } = useGetMyProfileQuery();
  const currentUser = myProfile?.data;

  const isOwnProfile = !username || currentUser?.username === username;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);

  const [updateUserBioMutation] = useUpdateUserBioMutation();
  const [updateUserProfilePictureMutation] =
    useUpdateUserProfilePictureMutation();
  const [deletePostMutation] = useDeletePostMutation();
  const { refetch } = useGetAllByUsernameQuery(
    username || currentUser?.username
  );
  const [createPicture] = useCreatePictureMutation();

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

  useEffect(() => {
    if (location.state?.openNewPost) {
      setIsModalOpen(true);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  if (postsLoading) return <div>Yükleniyor...</div>;
  if (postsError) return <div>Hata: {postsError}</div>;

  const handleBioUpdate = async () => {
    try {
      await updateUserBioMutation({ bio: newBio });
      myProfileQuery.refetch();
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
      myProfileQuery.refetch();
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
      await deletePostMutation(postId).unwrap();
      await refetch();
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Gönderi silinirken hata oluştu:", error);
    }
  };

  const handleDeletePost = (postId) => {
    setPostIdToDelete(postId);
    setShowDeleteModal(true);
  };
  const handleClickPicture = () => {
    fileInputRef.current.click(); // Dosya seçme penceresini aç
  };
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);

    try {
      const data = await createPicture(formData).unwrap();
      console.log(data);

      if (data.success) {
        setMediaUrl(
          import.meta.env.VITE_PICTURE_BASE_URL + "/" + data.data.url
        );
      } else {
        alert("Dosya yüklenemedi");
      }
    } catch (error) {
      alert("Dosya yüklenirken hata oluştu");
    }
  };

  if (getProfileLoading) return <div>Yükleniyor...</div>;
  if (!profile?.data) return <div>Profil bulunamadı</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-black text-white pt-16 pb-4 px-4">
      <div className="flex flex-col w-full max-w-5xl">
        {/* Profil İçeriği */}
        <div className="w-full">
          <div className="flex flex-col bg-black text-white">
            {/* Profil Başlığı */}
            <div className="flex flex-col items-center sm:flex-row sm:items-start sm:space-x-8 mt-4 space-y-4 sm:space-y-0">
              <img
                src={
                  profile?.data?.userProfilePicture
                    ? profile?.data?.userProfilePicture
                    : profilePicture
                }
                alt="Profile"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 aspect-square border-gray-600 cursor-pointer object-cover object-center"
                onClick={
                  isOwnProfile ? () => setIsProfileModalOpen(true) : undefined
                }
              />
              <div className="text-center sm:text-left w-full">
                <h2 className="text-2xl sm:text-3xl font-semibold mb-2">
                  {profile?.data?.username}
                </h2>
                <p className="text-sm mb-2">{profile?.data?.fullname}</p>
                <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                  {isEditing ? (
                    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full">
                      <textarea
                        type="text"
                        value={newBio}
                        onChange={(e) => setNewBio(e.target.value)}
                        className="px-2 py-1 text-sm border border-gray-600 rounded bg-gray-800 text-white w-full max-w-[400px] resize-none focus:outline-none"
                        rows="3"
                      />
                      <div className="flex space-x-2">
                        <button
                          className="h-7 w-7 text-sm text-white bg-blue-600 rounded hover:bg-blue-500 fas fa-check"
                          onClick={() => handleBioUpdate()}
                        ></button>
                        <button
                          className="h-7 w-7 text-sm text-white rounded bg-gray-800 hover:bg-gray-600 fas fa-times"
                          onClick={() => setIsEditing(false)}
                        ></button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row items-center w-full">
                      <p className="text-sm max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl text-center sm:text-left mb-2 sm:mb-0">
                        {profile?.data?.bio}
                      </p>
                      {isOwnProfile && (
                        <button
                          className="text-gray-400 hover:text-white ml-0 sm:ml-2"
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
            <div className="flex flex-col items-center w-full px-4 sm:px-20">
              {/* Takipçi Bilgileri */}
              <div className="w-full flex justify-around p-4 sm:p-6 my-4 sm:my-10 border-b border-gray-900">
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
              {/* Responsive Grid için düzenleme */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 w-full">
                {posts?.map((item, index) => (
                  <div
                    key={index}
                    className="relative group w-full h-auto bg-black border border-gray-800/50 rounded-lg overflow-hidden"
                  >
                    <img
                      src={item.mediaUrl}
                      alt="UserPost"
                      className="w-full h-auto object-cover aspect-square"
                    />
                    {isOwnProfile && (
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          className="absolute top-3 right-3 text-white p-2 rounded-lg bg-gray-500/80 hover:bg-gray-600/80 transition-colors duration-300"
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

      {/* Profil Resmi Modal */}
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
                <div className="flex flex-col items-center space-y-2">
                 <h1 className="flex justify-center items-center">Click to select an image</h1>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                <img
                  src={mediaUrl || profilePicture}
                  alt="Create Post"
                  className="relative w-[180px] h-[180px] object-cover object-center aspect-square rounded-full border-4 border-gray-700 shadow-xl hover:border-gray-600 transition-all duration-300"
                  onClick={handleClickPicture}
                />
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileChange}
              />

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
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300 text-sm"
                >
                  Save Changes
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
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900/90 rounded-lg p-6 w-[400px] border border-gray-800/50 shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
              Delete Post
            </h2>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete this post?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-800/80 text-white rounded-lg border border-gray-700/50 hover:bg-gray-700/80 transition-all duration-300 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmDelete(postIdToDelete)}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-blue-600 hover:to-purple-600 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-sm"
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
