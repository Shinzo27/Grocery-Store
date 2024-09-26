import { createClient } from 'redis'

const redisClient = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

console.log(REDIS_PASSWORD)

redisClient.on('error', (err) => {
    console.log('Redis Client Error:', err);
});

redisClient.on('connect', () => {
    console.log('Redis Client Connected!');
});

redisClient.on('ready', () => {
    console.log('Redis Client Ready!');
});

redisClient.on('reconnecting', () => {
    console.log('Redis Client Reconnecting...');
});

redisClient.on('end', () => {
    console.log('Redis Client Disconnected!');
});

// redisClient.connect()

export default redisClient