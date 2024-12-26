import Post from "../post/Post";
import { useGetAllPostsQuery } from "../../features/postFeatures/postApi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./Feed.css";

const Feed = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const isLoading = useSelector((state) => state.post.loading);
  const error = useSelector((state) => state.post.error);
  
  const { data: postsData, isLoading: isPostsLoading, error: apiError } = useGetAllPostsQuery();
  
  console.log("Posts Data Raw:", postsData);
  console.log("Is Posts Loading:", isPostsLoading);
  console.log("API Error:", apiError);
  console.log("Current Posts State:", posts);

  useEffect(() => {
    if (postsData?.data) {
      console.log("Dispatching posts data:", postsData.data);
      dispatch({ type: 'SET_POSTS_DATA', payload: postsData });
    }
  }, [postsData, dispatch]);

  useEffect(() => {
    if (posts.length === 0 && postsData?.data) {
      console.log("Posts empty, re-dispatching:", postsData.data);
      dispatch({ type: 'SET_POSTS_DATA', payload: postsData });
    }
  }, [posts, postsData, dispatch]);

  if (isPostsLoading || isLoading) {
    console.log("Loading state is true");
    return <div>Yükleniyor...</div>;
  }

  if (error || apiError) {
    console.error("Error in fetching posts:", error || apiError);
    return <div>Hata: {error || apiError?.message}</div>;
  }

  console.log("Rendering posts:", posts);

  return (
    <div className="feed">
      {posts?.length > 0 ? (
        posts.map((post) => (
          <Post key={post.id} post={post} />
        ))
      ) : (
        <div>Henüz gösterilecek gönderi yok</div>
      )}
    </div>
  );
};

export default Feed;
