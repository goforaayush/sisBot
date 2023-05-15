import {useClient} from '../services/redis';
import {keyPromise, scoreType} from './type';

let client = useClient();

export async function getSetKey(username: string): keyPromise {
  let scoreb25: scoreType = await client.zScore('b25', username);

  if (scoreb25 != null) return 'b25'; //name of key in redis
  let scoreb26: scoreType = await client.zScore('b26', username);
  if (scoreb26 != null) return 'b26'; //name of key in redis
  return null; //used for error haandling
}

export async function getHashKey(username: string): keyPromise {
  let inb25: boolean = await client.hExists('b25-roles', username);
  let inb26: boolean = await client.hExists('b26-roles', username);
  if (inb25) return 'b25-roles'; //name of key in redis
  if (inb26) return 'b26-roles'; //name of key in redis
  return null; //used for error haandling
}
