import React from 'react';
import Message from '../components/message/Message';
import Header from '../components/header/Header';

const MessagePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Header />
      <div className="flex-grow flex justify-center items-center p-4">
        <div className="w-full max-w-4xl">
          <Message />
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
