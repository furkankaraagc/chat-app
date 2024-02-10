'use client';
import { io } from 'socket.io-client';
import { baseURL } from './utils/utils';
import { getCookie } from 'cookies-next';

const token = getCookie('auth_token');
console.log('token', token);

const socket = io(`${baseURL}`, {
  autoConnect: false,
  withCredentials: true,
  auth: {
    token,
  },
});
export default socket;
