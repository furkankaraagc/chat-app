'use client';

import ChatLeftSide from '@/components/chat/chatLeftSide/ChatLeftSide';
import ChatLogSide from '@/components/chat/chatRightSide/ChatLogSide';

export default function Home() {
  return (
    <div className='bg-[#0C1318] h-screen p-10  w-screen  '>
      <div className='bg-[#111B21] h-full w-full flex text-white'>
        <ChatLeftSide />
        <ChatLogSide />
      </div>
    </div>
  );
}
