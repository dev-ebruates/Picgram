import React, { useState, useEffect } from 'react';
import { useGetAllCommentsQuery, useDeletePostCommentMutation } from "../../features/postFeatures/postApi.js";

const CommentModeration = () => {
  const { data, isLoading } = useGetAllCommentsQuery();
  const [openRow, setOpenRow] = useState(null);
  const [posts, setPosts] = useState(data);
  const [deletePostCommentMutation] = useDeletePostCommentMutation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setPosts(data);
  }, [data]);

  const toggleRow = (id) => {
    setOpenRow(openRow === id ? null : id);
  };

  const handleDelete = (postId, commentId) => {
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

  const filteredPosts = posts?.filter(
    (post) =>
      post.comments.some(
        (comment) =>
          comment.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          comment.comment.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  if (isLoading) {
    return <div>Comment moderation is loading...</div>;
  }

  return (
    <div className="p-4 md:p-6 bg-white">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">Comment Moderation</h2>
        <div className="flex items-center w-full md:w-auto">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search comments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black w-full"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {isMobile ? (
        <div className="space-y-4">
          {filteredPosts?.map((post) => (
            <div 
              key={post.id} 
              className="bg-white border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={post.mediaUrl}
                  alt="Media"
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="text-sm text-black">
                    {new Date(post.createdAt).toLocaleString()}
                  </p>
                  <button
                    onClick={() => toggleRow(post.id)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    {openRow === post.id ? "Hide Comments" : "Show Comments"}
                  </button>
                </div>
              </div>

              {openRow === post.id && (
                <div className="space-y-3">
                  {post.comments.length > 0 ? (
                    post.comments.map((comment) => (
                      <div 
                        key={comment.id} 
                        className="bg-gray-50 p-3 rounded-lg"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <p className="font-medium text-gray-800">
                            {comment.username}
                          </p>
                          <button
                            onClick={() => handleDelete(post.id, comment.id)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </div>
                        <p className="text-black text-sm">
                          {comment.comment}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(comment.createdAt).toLocaleString()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center">No comments</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
          <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-gray-900 text-white">
              <tr>
                <th className="p-3 text-left">Media</th>
                <th className="p-3 text-left">Created At</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts?.map((post) => (
                <React.Fragment key={post.id}>
                  <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-3">
                      <img
                        src={post.mediaUrl}
                        alt="Media"
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                    <td className="p-3 text-black">
                      {new Date(post.createdAt).toLocaleString()}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => toggleRow(post.id)}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                      >
                        {openRow === post.id ? "Hide Comments" : "Show Comments"}
                      </button>
                    </td>
                  </tr>

                  {openRow === post.id && (
                    <tr>
                      <td colSpan={3} className="p-4 bg-gray-50">
                        <div className="max-h-40 overflow-y-auto">
                          <h3 className="font-bold mb-2 text-black">Comments</h3>
                          {post.comments.length > 0 ? (
                            post.comments.map((comment) => (
                              <div
                                key={comment.id}
                                className="mb-4 p-2 border-b border-gray-300"
                              >
                                <div className="flex justify-between items-center">
                                  <div>
                                    <p>
                                      <span className="font-medium text-black">User:</span>{" "}
                                      <i className="text-gray-700">  {comment.username}</i>
                                     
                                    </p>
                                    <p>
                                      <span className="font-medium text-black">Comment:</span>{" "}
                                      <i className="text-gray-700"> {comment.comment}</i>
                                    </p>
                                    <p>
                                      <span className="font-medium text-black">Created At:</span>{" "}
                                      <i className="text-gray-700">  {new Date(comment.createdAt).toLocaleString()}</i>
                                     
                                    </p>
                                  </div>
                                  <button
                                    onClick={() => handleDelete(post.id, comment.id)}
                                    className="text-red-600 hover:text-red-800"
                                    title="Delete"
                                  >
                                    🗑️
                                  </button>
                                </div>
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
      )}

      {filteredPosts?.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No comments found.
        </div>
      )}
    </div>
  );
};

export default CommentModeration;