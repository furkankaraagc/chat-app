'use client';

import ChatLeftSide from '@/components/chat/chatLeftSide/ChatLeftSide';
import ChatLogSide from '@/components/chat/chatRightSide/ChatLogSide';

export default function Home() {
  return (
    <div className='bg-gray-100 h-screen   w-screen  '>
      <div className='bg-white h-full w-full flex text-white'>
        <ChatLeftSide />
        <ChatLogSide />
      </div>
    </div>
  );
}
