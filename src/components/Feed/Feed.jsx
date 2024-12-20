import Post from "../post/Post";
import "./Feed.css";
import { useGetAllPostsQuery } from "../../features/postFeatures/postApi";

function Feed() {
  const { data: posts = [], isLoading, error } = useGetAllPostsQuery();

  if (isLoading) return <div>Yükleniyor...</div>;
  if (error) return <div>Hata: {error.message}</div>;

  console.log('Posts data:', posts); // Gelen veriyi kontrol edelim

  return (
    <div className="feed">
      {posts?.data?.map((post, index) => (
        <Post
          key={index}
          username={post.username}
          profileImage={post.userProfilePicture}
          time={post.createdAt}
          content={post.caption}
          image={post.mediaUrl}
          location={post.location}
        />
      ))}
    </div>
  );
}

export default Feed;
