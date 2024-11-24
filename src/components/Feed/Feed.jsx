import Post from "../Post/Post";
import "./Feed.css";

function Feed() {
  const posts = [
    {
      username: "dogancem",
      time: "30m",
      content: "First post!",
      profileImage: "https://picsum.photos/200",
      image: "https://picsum.photos/200",
      location: "Istanbul, Turkey",
    },
    {
      username: "dogancem",
      time: "30m",
      content: "First post!",
      profileImage: "https://picsum.photos/200",
      image: "https://picsum.photos/200",
      location: "Istanbul, Turkey",
    },
    {
      username: "dogancem",
      time: "30m",
      content: "First post!",
      profileImage: "https://picsum.photos/200",
      image: "https://picsum.photos/200",
      location: "Istanbul, Turkey",
    },
    {
      username: "dogancem",
      time: "30m",
      content: "First post!",
      profileImage: "https://picsum.photos/200",
      image: "https://picsum.photos/200",
      location: "Istanbul, Turkey",
    },
    {
      username: "dogancem",
      time: "30m",
      content: "First post!",
      profileImage: "https://picsum.photos/200",
      image: "https://picsum.photos/200",
      location: "Istanbul, Turkey",
    },
    {
      username: "dogancem",
      time: "30m",
      content: "First post!",
      profileImage: "https://picsum.photos/200",
      image: "https://picsum.photos/200",
      location: "Istanbul, Turkey",
    },
    {
      username: "dogancem",
      time: "30m",
      content: "First post!",
      profileImage: "https://picsum.photos/200",
      image: "https://picsum.photos/200",
      location: "Istanbul, Turkey",
    },
    {
      username: "dogancem",
      time: "30m",
      content: "First post!",
      profileImage: "https://picsum.photos/200",
      image: "https://picsum.photos/200",
      location: "Istanbul, Turkey",
    },
    {
      username: "dogancem",
      time: "30m",
      content: "First post!",
      profileImage: "https://picsum.photos/200",
      image: "https://picsum.photos/200",
      location: "Istanbul, Turkey",
    },
    {
      username: "dogancem",
      time: "30m",
      content: "First post!",
      profileImage: "https://picsum.photos/200",
      image: "https://picsum.photos/200",
      location: "Istanbul, Turkey",
    },
  ];

  return (
    <div className="feed">
      {posts.map((post, index) => (
        <Post
          key={index}
          username={post.username}
          profileImage={post.profileImage}
          time={post.time}
          content={post.content}
          image={post.image}
          location={post.location}
        />
      ))}
    </div>
  );
}

export default Feed;
