/* eslint-disable no-unused-vars */
import Header from "../components/header/Header";
import { useState, useEffect } from "react";
import Modal from "../components/modal/modal.jsx";
import PostForm from "../components/postForm/PostForm.jsx";
import { useUpdateUserBioMutation } from "../features/userFeatures/userApi.js";
import { useGetMyProfileQuery } from "../features/userFeatures/userApi.js";
import { useGetAllByUserIdQuery } from "../features/postFeatures/postApi";
import { useDispatch, useSelector } from "react-redux";
import { 
  setProfile, 
  setPosts, 
  selectUserProfile, 
  selectUserPosts,
  selectUserLoading,
  setLoading
} from "../features/userFeatures/userSlice";
import { setUserPosts, selectUserPosts as selectPostsFromPostSlice } from "../features/postFeatures/postSlice";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const profile = useSelector(selectUserProfile);
  const posts = useSelector(selectPostsFromPostSlice);
  const loading = useSelector(selectUserLoading);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newBio, setNewBio] = useState("");

  const [updateUserBioMutation] = useUpdateUserBioMutation();

  const {
    data: getMyProfileData,
    isLoading: getMyProfileLoading,
  } = useGetMyProfileQuery();

  const {
    data: userPosts = [],
    isLoading: postsLoading,
  } = useGetAllByUserIdQuery();

  // Profil verilerini güncelle
  useEffect(() => {
    if (getMyProfileData?.data && !profile) {
      dispatch(setProfile(getMyProfileData.data));
    }
  }, [getMyProfileData, dispatch, profile]);

  // Kullanıcı gönderilerini güncelle
  useEffect(() => {
    if (userPosts?.data) {
      dispatch(setUserPosts(userPosts.data));
    }
  }, [userPosts, dispatch]);

  // Loading durumunu güncelle
  useEffect(() => {
    const isLoading = getMyProfileLoading || postsLoading;
    if (loading !== isLoading) {
      dispatch(setLoading(isLoading));
    }
  }, [getMyProfileLoading, postsLoading, dispatch, loading]);

  // Biyografiyi güncelle
  useEffect(() => {
    if (profile?.bio && !newBio) {
      setNewBio(profile.bio);
    }
  }, [profile, newBio]);

  const handleUpdateBio = async () => {
    try {
      const response = await updateUserBioMutation({ bio: newBio }).unwrap();
      if (response.success) {
        dispatch(setProfile({ ...profile, bio: newBio }));
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Bio güncelleme hatası:', error);
    }
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

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
                  profile?.userProfilePicture
                    ? profile?.userProfilePicture
                    : "https://via.placeholder.com/150"
                }
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-gray-600"
              />
              <div>
                <h2 className="text-3xl font-semibold ">{profile?.username}</h2>
                <p className="text-sm">{profile?.fullname}</p>
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
                        onClick={() => handleUpdateBio()}
                      ></button>
                      <button
                        className="h-7 w-7 text-sm text-white rounded bg-gray-800 hover:bg-gray-600 fas fa-times "
                        onClick={() => setIsEditing(false)}
                      ></button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 ml-auto">
                      <p className="text-sm max-w-[700px]">{profile?.bio}</p>
                      <button
                        className="text-gray-400 hover:text-white"
                        onClick={() => {
                          setNewBio(profile?.bio);
                          setIsEditing(true);
                        }}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center  px-20">
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
                onClick={() => setIsModalOpen(true)}
              >
                New post
              </button>
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
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <PostForm onSubmit={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default ProfilePage;
