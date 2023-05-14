import {getApp} from './app';
import {checkRole, deleteRole, getRole, updateRole} from './scripts/roles';
import {batchScore, minusminus, plusplus, tellScore} from './scripts/score';
import {getSetKey} from './utils/getKey';

let app = getApp(); //to get app instance here

app.message('ping', async ({message, say}) => {
  console.log(message);
  await say('pong');
});
app.message('--', async ({message, say}) => {
  //score.ts
  const text: string = JSON.parse(JSON.stringify(message)).text;
  let index: number = text.indexOf('-');
  let username: string = text.slice(0, index);
  let toSay: string = await minusminus(username);
  await say(toSay!);
});

app.message('++', async ({message, say}) => {
  //score.ts
  const text: string = JSON.parse(JSON.stringify(message)).text;
  let index: number = text.indexOf('+');
  let username: string = text.slice(0, index);
  let toSay: string = await plusplus(username);
  await say(toSay!);
});

app.message('bhai bta', async ({message, say}) => {
  //roles.ts
  const text: string = JSON.parse(JSON.stringify(message)).text;

  let username: string = text.slice(9);
  let key: string | null = await getSetKey(username);

  if (key == null) {
    await say(username + 'kon hai????');
  } else {
    let score: number | null = await tellScore(username, key);
    await say(username + ' : ' + score);
  }
});

app.message(' is ', async ({message, say}) => {
  //roles.ts
  let toSay:string;
  const text: string = JSON.parse(JSON.stringify(message)).text;
  let msg: string[] = text.split(' ');
  if (msg[0] == 'who') {
    let username: string = msg[2];
    toSay = await getRole(username);
    
  } 
  else if(msg[2]=="not"){

    let username:string = msg[0];
    let role:string =text.slice(username.length+8)
    toSay= await deleteRole(username,role)
  }
  else {
    let index: number = text.indexOf(' ');
    let username: string = text.slice(0, index);
    let role: string = text.slice(index + 4);
     toSay = await updateRole(username, role);
    
  }
  await say(toSay);
});

app.message('bhai score', async ({message, say}) => {
  //score.ts
  const text: string = JSON.parse(JSON.stringify(message)).text;
  let key: string = text.slice(11);

  await say(await batchScore(key));
});

app.message('Is ', async ({message, say}) => {
  //roles.ts
  const text: string = JSON.parse(JSON.stringify(message)).text;
  let msg: string[] = text.split(' ');
  let username: string = msg[1];
  let role: string = text.slice(username.length + 4);
  await say(await checkRole(username, role));
});



