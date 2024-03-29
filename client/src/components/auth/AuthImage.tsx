import Image from 'next/image';

const AuthImage = () => {
  return (
    <Image
      className='h-screen object-cover w-[150px]  border-gray-50 '
      src={'/chat1.jpg'}
      alt=''
      width={700}
      height={1080}
      priority={true}
    />
  );
};

export default AuthImage;
