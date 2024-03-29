import Image from 'next/image';

const AuthImage = () => {
  return (
    <Image
      className='h-screen object-cover w-[150px]. border-r  border-gray-50 '
      src={'/chat1.jpg'}
      alt=''
      width={1500}
      height={1080}
      quality={100}
      priority={true}
    />
  );
};

export default AuthImage;
