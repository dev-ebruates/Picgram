import { useState } from 'react';
import {useCreatePostCommentMutation} from '../../features/postFeatures/postApi.js'
import { v4 as uuidv4 } from 'uuid';

const Comments = ({ comments, postId}) => {
  const [newComment, setNewComment] = useState('');
   
  const [createPostComment] = useCreatePostCommentMutation();
  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      createPostComment({postId:postId,comment:newComment, id: uuidv4()});
      setNewComment('');
    }
  };

  return (<div>

        {/* Yorum Ekleme Alanı */}
        <form
          onSubmit={handleSubmitComment}
          className="mt-2 flex items-center space-x-2"
        >
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="write your comment..."
            className="flex-1 bg-gray-900 text-white border border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <button
            type="submit"
            className="bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      <div className={`space-y-4 p-4 bg-black rounded-lg max-h-[300px] overflow-y-auto`}>
      {comments?.map((comment) => (
        <div 
          key={comment?.id} 
          className="flex items-start space-x-3 bg-black border border-gray-800 p-3 rounded-xl shadow-sm transition-colors duration-200"
        >
          {/* Profil Resmi */}
          <img 
            src={comment?.profilePicture} 
            alt={`${comment?.username}'in profil resmi`} 
            className="w-10 h-10 rounded-full object-cover"
          />
          
          {/* Yorum İçeriği */}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-200">{comment?.username}</h4>
              <span className="text-xs text-gray-200">
                {new Date(comment?.createdAt).toLocaleDateString('tr-TR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
            <p className="text-gray-300 mt-1">{comment?.comment}</p>
          </div>
        </div>
      ))}
      
      {comments?.length === 0 && (
        <div className="text-center text-gray-500 py-4">
         No comments yet
        </div>
      )}
    </div>
  </div>
  
  );
};

export default Comments;
