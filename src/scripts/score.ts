import { useClient } from "../services/redis";

let client =  useClient();

export async function plusplus(username:string) {
    let scores = await client.zScore("b26", username);
    if (scores==null) {
        return "kon hai "+username    
    }else{
    await client.zIncrBy("b26", 1, username);
    scores = await client.zScore("b26", username);
    return username+"++! Jiooo mere sherrr [ You at "+scores+" ]";
    }
}

export async function minusminus(username:string) {
    let scores = await client.zScore("b26", username);
    if (scores==null) {
        return "kon hai "+username    
    }else{
    client.zAdd("b26",{score: --scores!, value: username})
    scores = await client.zScore("b26", username);
    return username+"--! Jaaa ab kaaa hogaa [ You at "+scores+" ]";
    }
    
}

export async function tellScore(username:string) {
    let scores = await client.zScore("b26", username);
    return scores
    
}