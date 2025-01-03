import React, { useState } from 'react';

const Comments = ({ comments, className = '', onAddComment }) => {
  const [newComment, setNewComment] = useState('');
  const [showAllComments, setShowAllComments] = useState(false);

  const displayedComments = showAllComments ? comments : comments.slice(0, 1);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div className={`space-y-4 p-4 bg-black rounded-lg max-h-[300px] overflow-y-auto ${className}`}>
      {displayedComments.map((comment) => (
        <div 
          key={comment.id} 
          className="flex items-start space-x-3 bg-black border border-gray-800 p-3 rounded-xl shadow-sm transition-colors duration-200"
        >
          {/* Profil Resmi */}
          <img 
            src={comment.profilePicture} 
            alt={`${comment.username}'in profil resmi`} 
            className="w-10 h-10 rounded-full object-cover"
          />
          
          {/* Yorum İçeriği */}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-200">{comment.username}</h4>
              <span className="text-xs text-gray-200">
                {new Date(comment.createdAt).toLocaleDateString('tr-TR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
            <p className="text-gray-300 mt-1">{comment.comment}</p>
          </div>
        </div>
      ))}
      
      {comments.length === 0 && (
        <div className="text-center text-gray-500 py-4">
         No comments yet
        </div>
      )}

      {!showAllComments && comments.length > 1 && (
        <button 
          onClick={() => setShowAllComments(true)}
          className="w-full text-center text-blue-500 hover:text-blue-400 transition-colors"
        >
          {comments.length - 1} see all comments
        </button>
      )}

      {showAllComments && comments.length > 1 && (
        <div className="space-y-4">
          {comments.slice(1).map((comment) => (
            <div 
              key={comment.id} 
              className="flex items-start space-x-3 bg-black border border-gray-800 p-3 rounded-xl shadow-sm transition-colors duration-200"
            >
              {/* Profil Resmi */}
              <img 
                src={comment.profilePicture} 
                alt={`${comment.username}'in profil resmi`} 
                className="w-10 h-10 rounded-full object-cover"
              />
              
              {/* Yorum İçeriği */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-200">{comment.username}</h4>
                  <span className="text-xs text-gray-200">
                    {new Date(comment.createdAt).toLocaleDateString('tr-TR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <p className="text-gray-300 mt-1">{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;
