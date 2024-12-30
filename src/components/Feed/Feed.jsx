import Post from "../post/Post";
import { useGetAllPostsQuery } from "../../features/postFeatures/postApi";
import { useEffect } from "react";
import "./Feed.css";

const Feed = () => {  
  const { data: posts, isLoading: isLoading, error: error } = useGetAllPostsQuery();

  useEffect(() => {
  }, []);

  if (isLoading) return <div>Yükleniyor...</div>;
  if (error) return <div>Hata: {error}</div>;

  return (
    <div className="feed">
      {posts?.map((post, i) => (
        <Post key={i} post={post} />
      ))}
    </div>
  );
};

export default Feed;
