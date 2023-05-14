//using Hash datatype of redis for roles

import {useClient} from '../services/redis';
import {getHashKey} from '../utils/getKey';

let client = useClient();

export async function updateRole(username: string, role: string) {
  let key = await getHashKey(username);
  if (key != null) {
    let roles = await client.hGet(key, username);
    if (roles == '') {
      await client.hSet(key, username, role); //initial role
    } else {
      await client.hSet(key, username, roles + ' , ' + role); //increasing roles
    }

    return 'Okay! ' + username + ' is ' + role + '.'; //confirmation
  } else {
    return username + ' kon hai????'; //ErrorHandling
  }
}

export async function getRole(username: string) {
  let key = await getHashKey(username); //fetch key from utils

  if (key != null) {
    let roles = await client.hGet(key, username);
    if (roles == '') return 'Aap btao kon hai ' + username + '.'; //ErrorHandling
    return username + ' is ' + roles + '.';
  } else {
    return username + ' kon hai????'; //ErrorHandling
  }
}
