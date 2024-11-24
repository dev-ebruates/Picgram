import "./Post.css";

function Post({ username, time, content, image, location, profileImage }) {
  return (
    <div className="max-w-md mx-auto my-5 border border-black rounded-lg shadow-md bg-black border-b-gray-900">
      {/* Kullanıcı Bilgileri */}
      <div className="flex items-center px-4 py-3 ">
        <img
          src={profileImage}
          alt="Profil Resmi"
          className="w-16 h-16 rounded-full"
        />
        <div className="ml-3">
          <p className="font-semibold">{username}</p>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
      </div>

      {/* Gönderi Resmi */}
      <img
        src={image}
        alt="Gönderi Resmi"
        className="w-full h-max object-cover" // Resim boyutu arttırıldı
      />

      {/* Eylem Butonları */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex space-x-4">
          <button className="fas fa-heart hover:text-gray-400 text-2xl"></button>
          <button className="fas fa-comment hover:text-gray-400 text-2xl"></button>
        </div>
      </div>

      {/* Açıklama ve Yorum */}
      <div className="px-4 pb-4">
        <p>
          <span className="font-semibold">{username} </span>Lorem ipsum dolor sit amet consectetur adipisicing elit. ❤️
        </p>
        <p className="text-sm text-gray-500 mt-2">View all 10 comments</p>
        <p className="text-sm text-gray-400 mt-1">2 hours ago</p>
      </div>
    </div>
  );
}

export default Post;
