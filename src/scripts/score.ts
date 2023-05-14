import { useClient } from "../services/redis";
import { getSetKey } from "../utils/getKey";

let client =  useClient();

export async function plusplus(username:string) {
    let key = getSetKey(username);
    
    if (key==null) {
        return "kon hai "+username    
    }else{

    await client.zIncrBy(key, 1, username);
    let scores = await client.zScore(key, username);
    return username+"++! Jiooo mere sherrr [ You at "+scores+" ]";
    }
}

export async function minusminus(username:string) {
    // let scores = await client.zScore("b26", username);
    let key = getSetKey(username);
    
    if (key==null) {
        return "kon hai "+username    
    }else{
    let scores = await client.zScore(key, username);
    client.zAdd(key,{score: --scores!, value: username})
    scores = await client.zScore(key, username);
    return username+"--! Jaaa ab kaaa hogaa [ You at "+scores+" ]";
    }
    
}

export async function tellScore(username:string, key:string) {
    let scores = await client.zScore(key, username);
    return scores
    
}