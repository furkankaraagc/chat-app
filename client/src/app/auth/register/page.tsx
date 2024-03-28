import AuthImage from '@/components/auth/AuthImage';
import Register from '@/components/auth/Register';
import Link from 'next/link';

const Page = () => {
  return (
    <main className='w-screen  h-screen flex'>
      <AuthImage />
      <div className='flex flex-col gap-10 items-center w-full'>
        <h1 className='w-[400px] mt-20 font-normal text-[60px] '>/register</h1>

        <Register />
        <Link className='underline' href={'/auth/login'}>
          Back to Login
        </Link>
      </div>
    </main>
  );
};

export default Page;
