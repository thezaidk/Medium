import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from 'hono/jwt';
import { createBlogInput, updateBlogInput } from '@the_zaid_k/medium-common';
export const blogRouter = new Hono();
//middleware
blogRouter.use('/*', async (c, next) => {
    const jwt = c.req.header('authorization') || "";
    if (!jwt) {
        c.status(403);
        return c.json({ error: "Unauthorized user!" });
    }
    try {
        const token = jwt.split(" ")[1];
        const payload = await verify(token, c.env.JWT_SECRET);
        if (!payload) {
            c.status(403);
            return c.json({ error: "Unauthorized user!" });
        }
        c.set("userId", payload.id);
        await next();
    }
    catch (e) {
        c.status(403);
        return c.json({ error: "Unauthorized user!" });
    }
});
//routes
blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({ message: "Inputs not correct!" });
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const userId = c.get("userId");
    try {
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId
            }
        });
        return c.json({ id: post.id });
    }
    catch (e) {
        c.status(411);
        c.text("Error while inserting!");
    }
});
blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({ message: "Inputs not correct!" });
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const userId = c.get("userId");
    try {
        const post = await prisma.post.update({
            where: {
                id: body.id,
                authorId: userId
            },
            data: {
                title: body.title,
                content: body.content
            }
        });
        return c.text("updated post");
    }
    catch (e) {
        c.status(411);
        c.text("Error while updating!");
    }
});
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const posts = await prisma.post.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return c.json({ posts });
    }
    catch (e) {
        c.status(411);
        c.text("Error while fetching!");
    }
});
blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const id = c.req.param('id');
    const userId = c.get("userId");
    try {
        const post = await prisma.post.findFirst({
            where: {
                id: id,
                authorId: userId
            }
        });
        return c.json({ post });
    }
    catch (e) {
        c.status(411);
        c.text("Error while fetching!");
    }
});
