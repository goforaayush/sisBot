import {createClient} from 'redis';

let client = createClient({
  url: process.env.REDIS_URL,
});

export async function redisInit(): Promise<void> {
  client.on('error', err => {
    console.log('[REDIS]', err);
  });

  await client.connect();
}

export function useClient() {
  return client; //use this function to use client in other files
}

export async function redisClose(): Promise<void> {
  await client.disconnect();
}

function isReady(): boolean {
  if (!client.isReady) {
    console.log('[REDIS] Error: client is not ready');
    return false;
  } else return true;
}

export async function setValue(key: string, value: string): Promise<void> {
  if (!isReady()) {
    return;
  }
  await client.set(key, value);
}

export async function getValue(key: string): Promise<any> {
  if (!isReady()) {
    return undefined;
  }
  let data = await client.get(key);
  return data;
}
