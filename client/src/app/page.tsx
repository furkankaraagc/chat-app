'use client';

import useSocket from '@/hooks/useSocket';
import Link from 'next/link';

export default function Home() {
  useSocket();
  return (
    <div>
      <Link href='/auth'>Auth</Link>
      <Link href='/protected'>protected</Link>
    </div>
  );
}
