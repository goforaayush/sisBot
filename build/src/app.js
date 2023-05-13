"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const bolt_1 = require("@slack/bolt");
const redis_1 = require("./services/redis");
const app = new bolt_1.App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN,
});
app.message('ping', async ({ say }) => {
    await say('pong');
});
async function init() {
    await app.start(process.env.PORT || 3000);
    console.log('[APP] app is running');
    await (0, redis_1.redisInit)();
}
// client.zIncrBy("b26", 1, "Aayushmaan");
// client.zrange("b25", 0, 10, "withscores", function (err, listwithscores) {
//   if (err) throw err;
//   console.log("with scores:", listwithscores);
// });
init();
// const client = redis.createClient({
//   socket: {
//       host: '127.0.0.1',
//       port: 6379
//   },
// });
// client.on('connect', function(error) { console.log('working')});
//# sourceMappingURL=app.js.map