import Image from 'next/image';
import chatImage from '../../../public/chat1.jpg';

const AuthImage = () => {
  return (
    <Image
      className='h-screen object-cover w-[150px] border-r  border-gray-50 '
      src={chatImage}
      alt=''
      width={600}
      priority={true}
    />
  );
};

export default AuthImage;
