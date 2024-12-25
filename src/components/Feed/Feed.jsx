import Post from "../post/Post";
import { useGetAllPostsQuery } from "../../features/postFeatures/postApi";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, selectAllPosts, selectPostLoading, selectPostError } from "../../features/postFeatures/postSlice";
import { useEffect } from "react";
import "./Feed.css";

const Feed = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const isLoading = useSelector(selectPostLoading);
  const error = useSelector(selectPostError);
  
  const { data: postsData, isLoading: isPostsLoading } = useGetAllPostsQuery();
  console.log("Posts Data:", postsData);

  useEffect(() => {
    if (postsData?.data) {
      dispatch(setPosts(postsData.data));
    }
  }, [postsData, dispatch]);

  if (isPostsLoading || isLoading) return <div>Yükleniyor...</div>;
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
