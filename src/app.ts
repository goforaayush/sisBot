import * as dotenv from 'dotenv';
dotenv.config();

import {App} from '@slack/bolt';
import {redisInit} from './services/redis';
import {appInstance} from './utils/type';

const app: appInstance = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true, // add this
  appToken: process.env.SLACK_APP_TOKEN,
});

export function getApp(): appInstance {
  return app;
}

async function init(): Promise<void> {
  await app.start(process.env.PORT || 3000);
  console.log('[APP] app is running');
  await redisInit();
}
init();
