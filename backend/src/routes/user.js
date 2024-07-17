import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import { signupInput, signinInput } from "@the_zaid_k/medium-common";
export const userRouter = new Hono();
//routes
userRouter.post('/signup', async (c) => {
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({ message: "Inputs not correct!" });
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                name: body.name,
                password: body.password
            }
        });
        const token = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ token });
    }
    catch (e) {
        c.status(403);
        return c.json({ error: "error while signing up" });
    }
});
userRouter.post('/signin', async (c) => {
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({ message: "Inputs not correct!" });
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const user = await prisma.user.findFirst({
        where: {
            email: body.email,
            password: body.password
        }
    });
    if (!user) {
        c.status(403);
        return c.json({ error: "user not found!" });
    }
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ token });
});
