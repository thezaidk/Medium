import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signupInput, signinInput } from "@the_zaid_k/medium-common";
import { Auth } from "../middleware";
import { Context } from 'hono';

export const userRouter= new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
      userId: string;
  }
}>();

//routes
interface CustomContext extends Context {
  get(key: 'userId'): string;
}

userRouter.get('/', Auth, async (c: CustomContext) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get('userId');

  try {
    const user= await prisma.user.findFirst({
        where: {
          id: userId
        },
        select: {
            id: true,
            email: true,
            name: true,
            bio: true
        }
    })

      return c.json({user})
  } catch (e) {
      c.status(411)
      c.text("Error while fetching!")
  }
})

userRouter.get('/blogs', Auth, async (c) => {
  const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId= c.get("userId");

  try{
      const posts= await prisma.post.findMany({
          where: {
              authorId: userId
          },
          select: {
              id: true,
              title: true,
              content: true,
              publishedDate: true,
              author: {
                  select: {
                      name: true
                  }
              }
          }
      });
      
      return c.json({posts})
  } catch (e) {
      c.status(411)
      c.text("Error while fetching!")
  }
})

userRouter.post('/signup', async (c) => {
    const body = await c.req.json();
    const { success }= signupInput.safeParse(body)
    if(!success){
      c.status(411);
      return c.json({message: "Inputs not correct!"})
    }

    const prisma = new PrismaClient({
      datasourceUrl: c. env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    try {
      const user= await prisma.user.create({
        data: {
          email: body.email, 
          password: body.password,
          name: body.name,
          bio: body.bio
        }
      });
      
      const token= await sign({id: user.id}, c.env.JWT_SECRET)
      return c.json({token})
    } catch(e) {
      c.status(403)
      return c.json({error: "error while signing up"})
    }
}) 
  
userRouter.post('/signin', async (c) => {
  const body = await c.req.json();
  const { success }= signinInput.safeParse(body)
  if(!success){
    c.status(411);
    return c.json({message: "Inputs not correct!"})
  }

  const prisma = new PrismaClient({
    datasourceUrl: c. env.DATABASE_URL,
  }).$extends(withAccelerate());

  const user= await prisma.user.findFirst({
    where: {
      email: body.email,
      password: body.password
    }
  })

  if(!user) {
    c.status(403)
    return c.json({error: "user not found!"})
  }

  const token= await sign({id: user.id}, c.env.JWT_SECRET)
  return c.json({token})
})

