import {
  useGetPostsQuery,
  useGetPostByIdQuery,
} from "../../features/featureApi.js";

const ReduxApiExample = () => {
  // Tüm gönderiler
  const { data: posts, error: postsError, isLoading: postsLoading } = useGetPostsQuery();
  // Belirli bir gönderi
  const { data: post, error: postError, isLoading: postLoading } = useGetPostByIdQuery(2);

  // Yükleme durumu
  if (postsLoading || postLoading) return <p>Loading...</p>;
  // Hata durumu
  if (postsError || postError) return <p>Error!</p>;

  return (
    <div>
      {/* Tüm gönderilerin listesi */}
      <ul>
        {posts?.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>

      {/* Belirli bir gönderi */}
      <div>
        <h2>Post Details</h2>
        {post ? (
          <div>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ) : (
          <p>Loading post...</p>
        )}
      </div>
    </div>
  );
};

export default ReduxApiExample;
