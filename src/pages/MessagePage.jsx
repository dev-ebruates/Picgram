import Message from '../components/message/Message';

const MessagePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <div className="flex-grow flex justify-center items-center p-4">
        <div className="w-full max-w-4xl">
          <Message />
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
