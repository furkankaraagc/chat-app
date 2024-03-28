import Image from 'next/image';

const AuthImage = () => {
  return (
    <Image
      className='h-screen object-cover w-[150px]  border-gray-50 '
      src={'/chat1.jpg'}
      alt=''
      width={1920}
      height={1080}
      quality={100}
    />
  );
};

export default AuthImage;
