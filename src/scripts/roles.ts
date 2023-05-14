import { useClient } from "../services/redis";
import { getHashKey } from "../utils/getKey";

let client =  useClient();

export async function updateRole(username:string, role:string) {
    let key = await getHashKey(username)
    if(key!=null)
    {
        let roles= await client.hGet(key ,username)
        if(roles =="")
        {
            await client.hSet(key,username,role)
        }
        else
        {
            await client.hSet(key,username,roles+" , "+role)
        }
        // roles = await client.hGet(key,username)
        return "Okay! " + username + " is " + role+"."
    }
    else{
        return username + " kon hai????"
    }
}


export async function getRole(username: string) {
    let key = await getHashKey(username)
    
    if(key!=null)
    {
        let roles= await client.hGet(key,username)
        if(roles=="") return "Aap btao kon hai "+username+"."
        return username + " is " + roles+"."
    }
    else{
        return username + " kon hai????"
    }
}