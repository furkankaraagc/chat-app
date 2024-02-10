import socket from '@/socket';
import { useEffect } from 'react';
const useSocket = () => {
  //if socket error then logout the user

  console.log('socket hook', socket);
  useEffect(() => {
    socket.connect();
    socket.on('connect_error', (err) => {
      console.log(err);
    });
    return () => {
      socket.off('connect_error');
    };
  }, []);
};
export default useSocket;
