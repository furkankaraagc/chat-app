import { Redis } from 'ioredis';

const redisClient = new Redis({
  port: 6379, // Redis port
  host: 'redis', // Redis host
  connectTimeout: 10000,
  keepAlive: 10000,
});

export default redisClient;
