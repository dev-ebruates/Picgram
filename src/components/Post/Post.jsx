import "./Post.css";

function Post({ username, time, content, image, location }) {
  return (

<div className="max-w-md mx-auto my-5 border border-black rounded-lg shadow-md bg-black">
      {/* Kullanıcı Bilgileri */}
      <div className="flex items-center px-4 py-3">
        <img
          src="https://via.placeholder.com/40"
          alt="Profil Resmi"
          className="w-10 h-10 rounded-full"
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
        className="w-full"
      />

      {/* Eylem Butonları */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex space-x-4">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-600 hover:text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 3.75a5.625 5.625 0 00-9 4.5c0 4.5 6.75 10.5 6.75 10.5s6.75-6 6.75-10.5a5.625 5.625 0 00-4.5-5.625z"
              />
            </svg>
          </button>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-600 hover:text-blue-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 21.75l-5.585-5.585M16.5 11.25a5.25 5.25 0 10-10.5 0 5.25 5.25 0 0010.5 0z"
              />
            </svg>
          </button>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-600 hover:text-green-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 6.75l8.25 8.25m0 0l8.25-8.25m-8.25 8.25V3"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Açıklama ve Yorum */}
      <div className="px-4 pb-4">
        <p>
          <span className="font-semibold">{username} </span>Lorem ipsum dolor sit
          amet consectetur adipisicing elit. ❤️
        </p>
        <p className="text-sm text-gray-500 mt-2">View all 10 comments</p>
        <p className="text-sm text-gray-400 mt-1">2 hours ago</p>
      </div>
    </div>
  );
    // <div className="post">
    //   <div className="post-header ">
    //     <h4>{username}</h4>
    //     <span>{time}</span>
    //   </div>
    //   <p>{content}</p>
    // </div>

    

}

export default Post;
