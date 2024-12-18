import {
  // useGetPostsQuery,
  useGetPostByIdQuery,
} from "../../features/featureApi.js";

const ReduxApiExample = () => {
  const { data, error, isLoading } = useGetPostByIdQuery(2);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;


  console.log(data);

  return (
    <div>
      {/* <ul>
        {data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul> */}
      <div>{JSON.stringify(data) || "Loading..."}</div>
    </div>
  );
};

export default ReduxApiExample;
