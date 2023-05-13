import * as dotenv from 'dotenv';
dotenv.config();

import {App} from '@slack/bolt';
import {redisInit} from './services/redis';
import * as router from './router';
import { minusminus, plusplus, tellScore } from './scripts/score';

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true, // add this
  appToken: process.env.SLACK_APP_TOKEN,
});

app.message('ping', async ({ say}) => {
  await say('pong');
});

async function init() {
  await app.start(process.env.PORT || 3000);
  console.log('[APP] app is running');
  await redisInit();
}

app.message('--', async ({message, say}) => {
  const text= JSON.parse(JSON.stringify(message)).text;
  let index= text.indexOf('-');
  let username = text.slice(0,index);
  await minusminus(username);
  await say(username+"--! Jaaaa, ab ka hogaaa!")
});

app.message('++', async ({message, say}) => {
  const text= JSON.parse(JSON.stringify(message)).text;
  let index= text.indexOf('+');
  let username = text.slice(0,index);
  await plusplus(username);
  await say(username+"++! Jai Mata Di!")
});

app.message('bhai bta', async ({message, say}) => {
  const text= JSON.parse(JSON.stringify(message)).text;
  // let index= text.indexOf('+');
  let username = text.slice(11);
  let score = await tellScore(username)
  await say(username+" : "+score)
});

init();


