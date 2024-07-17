import { Context, Next } from 'hono';
import { verify } from 'hono/jwt'

export const Auth= async (c: Context, next: Next) => {
    const jwt= c.req.header('authorization') || ""
    if(!jwt){
      c.status(403)
      return c.json({error: "Unauthorized user!"})
    }

    try{
        const token= jwt.split(" ")[1]
        const payload= await verify(token, c.env.JWT_SECRET)
        
        if(!payload){
            c.status(403)
            return c.json({error: "Unauthorized user!"})
        }
        c.set("userId", (payload as any).id as string);
        await next();
    } catch (e) {
        c.status(403)
        return c.json({error: "Unauthorized user!"})
    }
}