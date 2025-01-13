import Post from "../Post/Post.jsx";
import { useGetAllPostsQuery } from "../../features/postFeatures/postApi";
import "./Feed.css";

const Feed = () => {  
  const { data: posts, isLoading: isLoading, error: error } = useGetAllPostsQuery();

  if (isLoading) return <div>Yükleniyor...</div>;
  if (error) return <div>Hata: {error}</div>;
  
  return (
    <div className="feed">
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
