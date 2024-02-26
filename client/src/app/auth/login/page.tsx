import Login from '@/components/auth/Login';
import Link from 'next/link';

const Page = () => {
  return (
    <main className='w-screen bg-gray-50 h-screen flex flex-col gap-10  items-center  '>
      <h1 className='w-[400px] mt-20 font-normal text-[60px] '>/login</h1>
      <Login />
      <article className='flex gap-1'>
        <h2>New user? </h2>
        <Link className='underline' href={'/auth/register'}>
          Register
        </Link>
      </article>
    </main>
  );
};

export default Page;
