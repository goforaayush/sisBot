"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValue = exports.setValue = exports.redisClose = exports.redisInit = void 0;
const redis_1 = require("redis");
let client = (0, redis_1.createClient)({
    url: process.env.REDIS_URL,
});
async function redisInit() {
    client.on('error', err => {
        console.log('[REDIS]', err);
    });
    await client.connect();
}
exports.redisInit = redisInit;
async function redisClose() {
    await client.disconnect();
}
exports.redisClose = redisClose;
function isReady() {
    if (!client.isReady) {
        console.log('[REDIS] Error: client is not ready');
        return false;
    }
    else
        return true;
}
async function setValue(key, value) {
    if (!isReady()) {
        return;
    }
    await client.set(key, value);
}
exports.setValue = setValue;
async function getValue(key) {
    if (!isReady()) {
        return undefined;
    }
    let data = await client.get(key);
    return data;
}
exports.getValue = getValue;
//# sourceMappingURL=redis.js.map