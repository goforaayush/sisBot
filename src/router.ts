

import { getApp } from "./app";
import { getRole, updateRole } from "./scripts/roles";
import { batchScore, minusminus, plusplus, tellScore } from "./scripts/score";
import {  getSetKey } from "./utils/getKey";

let app = getApp();

app.message('ping', async ({message, say}) => {
    console.log(message);
    await say('pong');
});
app.message('--', async ({message, say}) => {
const text= JSON.parse(JSON.stringify(message)).text;
let index= text.indexOf('-');
let username = text.slice(0,index);
let toSay=await minusminus(username);
await say(toSay!)
});

app.message('++', async ({message, say}) => {
const text= JSON.parse(JSON.stringify(message)).text;
let index= text.indexOf('+');
let username = text.slice(0,index);
let toSay=await plusplus(username);
await say(toSay!)
});

app.message('bhai bta', async ({message, say}) => {
const text= JSON.parse(JSON.stringify(message)).text;

let username = text.slice(9);
let key= getSetKey(username);

if (key==null) {
    await say(username + "kon hai????")
    
}else{
    let score = await tellScore(username, key)
    await say(username+" : "+score)}
});

app.message(' is ', async ({message, say}) => {
const text= JSON.parse(JSON.stringify(message)).text;
if(text.slice(0,3)=="who"){
    let username = text.slice(7);
    let toSay = await getRole(username)
    await say(toSay)
}
else{
    let index= text.indexOf(' ');
    let username = text.slice(0,index);
    let role = text.slice(index+4)
    let toSay = await updateRole(username, role)
    await say(toSay)
}
});

app.message('id', async ({message, say}) => {
    const text= JSON.parse(JSON.stringify(message)).text;
    console.log(text)
    await say(text);
});

app.message('bhai score', async ({message, say}) => {
    const text= JSON.parse(JSON.stringify(message)).text;
    let key = text.slice(11)

    await say(await batchScore(key));
});

export var bruh = 50;
