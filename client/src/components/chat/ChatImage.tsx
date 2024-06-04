import Image from 'next/image';
import chatImage from '../../../public/chat1.jpg';

const ChatImage = () => {
  return (
    <Image
      className=' h-full object-cover border-r w-full brightness-75 border-gray-50 '
      src={chatImage}
      alt=''
      priority={true}
    />
  );
};

export default ChatImage;
