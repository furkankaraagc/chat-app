import Image from 'next/image';

const ChatImage = () => {
  return (
    <Image
      className=' h-full object-cover border-r w-full brightness-75 border-gray-50 '
      src={'/chat1.jpg'}
      alt=''
      width={1500}
      height={1080}
      quality={100}
      priority={true}
    />
  );
};

export default ChatImage;
