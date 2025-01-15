import React, { useState, useEffect } from 'react';
import  {useGetAllCommentsQuery, useDeletePostCommentMutation}  from "../../features/postFeatures/postApi.js";

const CommentModeration = () => {
  const { data, isLoading } = useGetAllCommentsQuery();
  const [openRow, setOpenRow] = useState(null); // Hangi satırın açık olduğunu takip etmek için.
  const [posts, setPosts] = useState(data);
  const [deletePostCommentMutation] = useDeletePostCommentMutation();

  useEffect(() => {
    setPosts(data);
  }, [data]);

  const toggleRow = (id) => {
    setOpenRow(openRow === id ? null : id); // Aynı satır tıklanırsa kapat, değilse aç.
  };

  const handleDelete = (postId, commentId) => {
    // Burada silme işlemini gerçekleştirin. Örneğin, bir API çağrısı yapabilirsiniz.
  
    deletePostCommentMutation({postId, commentId});
    const updatedPosts = posts?.map(post => {
        if (post.id === postId) {
            return {
                ...post,
                comments: post.comments.filter(comment => comment.id !== commentId),
            };
        }
        return post;
    });
    setPosts(updatedPosts);
  };

  if (isLoading) {
    return <div>Yorumlar yükleniyor...</div>; // Loading message
  }

  return (
    <div className="overflow-x-auto">
      <div className="overflow-y-auto max-h-[calc(100vh-150px)]">
        <div className="overflow-y-auto max-h-200">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-900">
              <tr>
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">Media</th>
                <th className="border border-gray-300 px-4 py-2">Created At</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts?.map((item) => (
                <React.Fragment key={item.id}>
                  {/* Ana Satır */}
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-gray-600">{item.id}</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-600">
                      <img
                        src={item.mediaUrl}
                        alt="Media"
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-600">
                      {new Date(item.createdAt).toLocaleString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2  text-gray-600">
                      <button
                        onClick={() => toggleRow(item.id)}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                      >
                        {openRow === item.id ? "Hide Comments" : "Show Comments"}
                      </button>
                    </td>
                  </tr>

                  {/* Açılır Satır */}
                  {openRow === item.id && (
                    <tr>
                      <td
                        colSpan={4}
                        className="border border-gray-300 px-4 py-2 bg-gray-50 text-gray-600"
                      >
                        <div className="max-h-40 overflow-y-auto">
                          <h3 className="font-bold mb-2 text-gray-600">Comments</h3>
                          {item.comments.length > 0 ? (
                            item.comments.map((comment) => (
                              <div
                                key={comment.id}
                                className="mb-4 p-2 border-b border-gray-300"
                              >
                                <p>
                                  <span className="font-medium text-gray-600">ID:</span>{
                                  comment.id}</p>
                                <p>
                                  <span className="font-medium text-gray-600">User:</span>{" "}
                                  {comment.username}
                                </p>
                                <p>
                                  <span className="font-medium text-gray-600">Comment:</span>{" "}
                                  {comment.comment}
                                </p>
                                <p>
                                  <span className="font-medium text-gray-600">Created At:</span>{" "}
                                  {new Date(comment.createdAt).toLocaleString()}
                                </p>
                                <button
                                  onClick={() => handleDelete(item.id, comment.id)}
                                  className="px-4 py-2 mt-2  text-white rounded hover:bg-gray-300"
                                >
                                  🗑️
                                </button>
                              </div>
                            ))
                          ) : (
                            <p>No comments available.</p>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CommentModeration
