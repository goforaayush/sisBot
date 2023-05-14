

import { getApp } from "./app";
import { getRole, updateRole } from "./scripts/roles";
import { minusminus, plusplus, tellScore } from "./scripts/score";

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
let score = await tellScore(username)
if (username==null) {
    await say(username + "kon hai????")
    
}else{
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


export var bruh = 50;
