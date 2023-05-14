import { useClient } from "../services/redis";

let client =  useClient();

export async function updateRole(username:string, role:string) {
    let whetherUsernameExists= await client.hExists("b26-hash",username)
    if(whetherUsernameExists)
    {
        let roles= await client.hGet("b26-hash",username)
        if(roles ==null)
        {
            await client.hSet("b26-hash",username,role)
        }
        else
        {
            await client.hSet("b26-hash",username,roles+" , "+role)
        }
        roles = await client.hGet("b26-hash",username)
        return "Okay! " + username + " is " + roles
    }
    else{
        return username + " kon hai????"
    }
}


export async function getRole(username: string) {
    
    let whetherUsernameExists= await client.hExists("b26-hash",username)
    if(whetherUsernameExists)
    {
        let roles= await client.hGet("b26-hash",username)
        
        return username + " is " + roles
    }
    else{
        return username + " kon hai????"
    }
}