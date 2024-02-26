import Register from '@/components/auth/Register';
import Link from 'next/link';

const Page = () => {
  return (
    <main className='w-screen bg-gray-50 h-screen flex flex-col gap-10  items-center  '>
      <h1 className='w-[400px] mt-20 font-normal text-[60px] '>/register</h1>

      <Register />
      <Link className='underline' href={'/auth/login'}>
        Back to Login
      </Link>
    </main>
  );
};

export default Page;
