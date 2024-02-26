'use client';
import { getCookie } from 'cookies-next';
import { io } from 'socket.io-client';
import { baseURL } from './utils/utils';

const token = getCookie('auth_token');

const socket = io(`${baseURL}`, {
  autoConnect: false,
  withCredentials: true,
  auth: {
    token,
  },
});
export default socket;
