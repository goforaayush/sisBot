import {getApp} from './app';
import {checkRole, deleteRole, getRole, updateRole} from './scripts/roles';
import {batchScore, minusminus, plusplus, tellScore} from './scripts/score';
import {getSetKey} from './utils/getKey';
import {AppMessage, appInstance, keyValueType, scoreType} from './utils/type';

let app: appInstance = getApp(); //to get app instance here

app.message('ping', async ({message, say}: AppMessage) => {
  console.log(message);
  await say('pong');
});
//to perform ++ and -- in the same command
app.message(/\++\+||\-+\-/g, async ({message, say}: AppMessage) => {
  //score.ts
  let text: string = JSON.parse(JSON.stringify(message)).text;
  while (text.includes('--') || text.includes('++')) {
    console.log(text);
    if (
      (text.indexOf('--') < text.indexOf('++') &&
        text.includes('++') &&
        text.includes('--')) ||
      (text.includes('--') && !text.includes('++'))
    ) {
      let index: number = text.indexOf('-');
      let username: string = text.slice(0, index);
      let toSay: string = await minusminus(username);
      text = text.replace(username + '--', '');
      await say(toSay!);
    } else if (
      (text.indexOf('++') < text.indexOf('--') &&
        text.includes('--') &&
        text.includes('++')) ||
      (text.includes('++') && !text.includes('--'))
    ) {
      let index: number = text.indexOf('+');
      let username: string = text.slice(0, index);
      let toSay: string = await plusplus(username);
      text = text.replace(username + '++', '');

      await say(toSay!);
    }
  }
});

app.message('bhai bta', async ({message, say}: AppMessage) => {
  //roles.ts
  const text: string = JSON.parse(JSON.stringify(message)).text;

  let username: string = text.slice(9);
  let key: keyValueType = await getSetKey(username);

  if (key == null) {
    await say(username + 'kon hai????');
  } else {
    let score: scoreType = await tellScore(username, key);
    await say(username + ' : ' + score);
  }
});

app.message(' is ', async ({message, say}: AppMessage) => {
  //roles.ts
  let toSay: string;
  const text: string = JSON.parse(JSON.stringify(message)).text;
  let msg: string[] = text.split(' ');
  if (msg[0] == 'who') {
    let username: string = msg[2];
    toSay = await getRole(username);
  } else if (msg[2] == 'not') {
    let username: string = msg[0];
    let role: string = text.slice(username.length + 8);
    toSay = await deleteRole(username, role);
  } else {
    let index: number = text.indexOf(' ');
    let username: string = text.slice(0, index);
    let role: string = text.slice(index + 4);
    toSay = await updateRole(username, role);
  }
  await say(toSay);
});

app.message('bhai score', async ({message, say}: AppMessage) => {
  //score.ts
  const text: string = JSON.parse(JSON.stringify(message)).text;
  let key: string = text.slice(11);

  await say(await batchScore(key));
});

app.message('Is ', async ({message, say}: AppMessage) => {
  //roles.ts
  const text: string = JSON.parse(JSON.stringify(message)).text;
  let msg: string[] = text.split(' ');
  let username: string = msg[1];
  let role: string = text.slice(username.length + 4);
  await say(await checkRole(username, role));
});

app.message('bhai madad', async ({say}: AppMessage) => {
  await say(
    'Use the following commands to interact:\n`ping`: Output-`pong`\n`name++`: increases score of name by 1\n`name--` : decreases score of name by 1\n`bhai bta name` : displayed score of name\n`bhai score bxx` : displays score of all the members of the batch bxx\n`name is role` : name is assigned the role\n`who is name` : roles of name are displayed\n`Is name role` : checksif the role is assigned to name\n`name is not role` : removes the role assigned to the name'
  );
});
