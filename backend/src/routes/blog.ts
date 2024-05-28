import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput } from "@rithik276/medium-common";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("Authorization") || "";
  const user = await verify(authHeader, c.env.JWT_SECRET);
  try {
    if (user) {
      c.set("userId", user.id);
      await next();
    } else {
      c.status(403);
      return c.json({
        message: "You are not logged in",
      });
    }
  } catch (e) {
    c.status(403);
    return c.json({
      message: "You are not logged in",
    });
  }
});

blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const { success } = await createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "invalid inputs",
    });
  }
  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: authorId,
      published: body.published,
    },
  });

  return c.json({
    id: blog.id,
  });
});

blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const { success } = await updateBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "invalid inputs",
    });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.blog.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
      published: body.published,
    },
  });

  return c.json({ id: blog.id });
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const blogs = await prisma.blog.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      publishedDate: true,
      published: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return c.json({
    blogs,
  });
});

blogRouter.get("/:id", async (c) => {
  const id = await c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        publishedDate: true,
        published: true,
        author: {
          select: {
            name: true,
            about: true,
          },
        },
      },
    });
    return c.json({ blog });
  } catch (e) {
    c.status(411);
    return c.json({
      message: "Error while fetching blog posts",
    });
  }
});

blogRouter.get("user_blogs/:id", async (c) => {
  const id = await c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.findMany({
      where: {
        authorId: id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        publishedDate: true,
        published: true,
        author: {
          select: {
            name: true,
            about: true,
          },
        },
      },
    });
    return c.json({ blog });
  } catch (e) {
    c.status(411);
    return c.json({
      message: "Error while fetching blog posts",
    });
  }
});

blogRouter.post("updateBlogStatus", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  try {
    const blog = await prisma.blog.update({
      where: {
        id: body.id,
      },
      data: {
        published: body.published,
      },
    });
    return c.json({ Response: "Update blog publish successful" });
  } catch (e) {
    c.status(411);
    return c.json({
      message: "Error while updating blog published status",
    });
  }
});
