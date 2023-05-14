//using Sorted Set datatype of redis for scores

import {useClient} from '../services/redis';
import {getSetKey} from '../utils/getKey';

let client = useClient();

export async function plusplus(username: string): Promise<string> {
  let key: string | null = await getSetKey(username);

  if (key == null) {
    //ErrorHandling
    return 'kon hai ' + username;
  } else {
    await client.zIncrBy(key, 1, username); //increase the score
    let scores: number | null = await client.zScore(key, username);
    return username + '++! Jiooo mere sherrr [ You at ' + scores + ' ]';
  }
}

export async function minusminus(username: string): Promise<string> {
  // let scores = await client.zScore("b26", username);
  let key: string | null = await getSetKey(username);

  if (key == null) {
    //ErrorHandling
    return 'kon hai ' + username;
  } else {
    let scores: number | null = await client.zScore(key, username);
    client.zAdd(key, {score: --scores!, value: username}); //decrease the score.
    scores = await client.zScore(key, username);
    return username + '--! Jaaa ab kaaa hogaa [ You at ' + scores + ' ]';
  }
}

export async function tellScore(
  username: string,
  key: string
): Promise<number | null> {
  let scores: number | null = await client.zScore(key, username); //fetch the score
  return scores;
}

export async function batchScore(key: string): Promise<string> {
  if (key != 'b25' && key != 'b26') return 'Not an active batch.'; //ErrorHandling
  let members: {
    score: number;
    value: string;
  }[] = await client.ZRANGE_WITHSCORES(key, 0, await client.zCard(key)); //list of members with scores

  let longestNameLength: number = 0;
  for (let data of members) {
    //this if block is for making the block of response presentable
    let length: number = data.value.length;
    if (longestNameLength < length) longestNameLength = length;
  }
  if (longestNameLength % 2 == 1) longestNameLength++;
  let say: string =
    'Name'.padStart((longestNameLength + 4) / 2).padEnd(longestNameLength) +
    ' : Score\n';
  for (let data of members.reverse()) {
    say =
      say +
      (data.value.padEnd(longestNameLength, ' ') + ' : ' + data.score + '\n'); //this is the required block
  }

  return '```' + say + '```'; //back ticks for the codeblock
}
