import { useEffect, useState } from "react";
import Post from "../post/Post";
import "./Feed.css";
import { getAllPosts } from "../../services/postServices.js";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts().then((response) => {
      setPosts(response.data);
    });
  }, []);

  return (
    <div className="feed">
      {posts.map((post, index) => (
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
