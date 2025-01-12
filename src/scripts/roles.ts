//using Hash datatype of redis for roles

import {useClient} from '../services/redis';
import {getHashKey} from '../utils/getKey';
import {keyValueType, roleType} from '../utils/type';

let client = useClient();

export async function updateRole(
  username: string,
  role: string
): Promise<string> {
  let key: keyValueType = await getHashKey(username);
  if (key != null) {
    let roles: roleType = await client.hGet(key, username);
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

export async function getRole(username: string): Promise<string> {
  let key: keyValueType = await getHashKey(username); //fetch key from utils

  if (key != null || key == '.') {
    let roles: roleType = await client.hGet(key, username);
    if (roles == '') return 'Aap btao kon hai ' + username + '.'; //ErrorHandling
    return username + ' is ' + roles + '.';
  } else {
    return username + ' kon hai????'; //ErrorHandling
  }
}

export async function checkRole(
  username: string,
  role: string
): Promise<string> {
  let key: keyValueType = await getHashKey(username); //fetch key from utils

  if (key != null) {
    let roles: roleType = await client.hGet(key, username);
    if (roles!.includes(role)) return 'Yes! ' + username + ' is ' + role + '.'; //checks and responds
    return 'No! ' + username + ' is not ' + role + '.';
  } else {
    return username + ' kon hai????'; //ErrorHandling
  }
}
export async function deleteRole(
  username: string,
  role: string
): Promise<string> {
  let key: keyValueType = await getHashKey(username); //fetch key from utils
  if (key != null) {
    let roles: roleType = await client.hGet(key, username);
    if (roles!.includes(role)) {
      roles = roles?.replace(role + ' , ', '');
      roles = roles?.replace(role, '');
      await client.hSet(key, username, roles!);
      return 'Okay!';
    } else {
      return username + ' is already not ' + role + '.';
    }
  } else {
    return username + ' kon hai????'; //ErrorHandling
  }
}
