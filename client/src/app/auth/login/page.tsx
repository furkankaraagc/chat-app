import AuthImage from '@/components/auth/AuthImage';
import Login from '@/components/auth/Login';
import Link from 'next/link';

const Page = () => {
  return (
    <main className='w-screen  h-screen flex '>
      <AuthImage />
      <div className='flex flex-col gap-10 items-center  w-full'>
        <h1 className='w-[400px] mt-20 font-normal text-[60px] '>/login</h1>
        <Login />
        <article className='flex gap-1'>
          <h2>New user? </h2>
          <Link className='underline' href={'/auth/register'}>
            Register
          </Link>
        </article>
      </div>
    </main>
  );
};

export default Page;
