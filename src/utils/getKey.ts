
import { useClient } from "../services/redis";

let client =  useClient();

export function getSetKey(username:string){
    let scoreb25 =  client.zScore("b25",username);
    
    if (scoreb25!=null) return "b25"
    let scoreb26 =  client.zScore("b26",username);
    if (scoreb26!=null) return "b26"
    return null
}

export  async function getHashKey(username:string){
    let inb25 = await client.hExists("b25-roles",username)
    let inb26 = await client.hExists("b26-roles",username)
    if(inb25) return "b25-roles"
    if(inb26) return "b26-roles"
    return null
}
