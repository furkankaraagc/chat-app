import Image from 'next/image';

const ChatImage = () => {
  return (
    <Image
      className=' h-full object-cover border-r w-full brightness-75 border-gray-50 '
      src={'/chat1.jpg'}
      alt=''
      width={1000}
      height={1080}
      priority={true}
    />
  );
};

export default ChatImage;
