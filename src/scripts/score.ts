import { useClient } from "../services/redis";

let client =  useClient();

export async function plusplus(username:string) {
   await client.zIncrBy("b26", 1, username);
}

export async function minusminus(username:string) {
    let scores = await client.zScore("b26", username);
    client.zAdd("b26",{score: --scores!, value: username})
    
 }
 export async function tellScore(username:string) {
    let scores = await client.zScore("b26", username);
    return scores
    
 }