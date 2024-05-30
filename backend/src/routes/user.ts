import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signInInput, signUpInput } from "@rithik276/medium-common";
import { Context, ErrorHandler, Hono, Next } from "hono";
import { sign, verify } from "hono/jwt";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = await signUpInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "invalid inputs",
    });
  }
  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.username,
      password: body.password,
    },
  });

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);

  return c.json({
    jwt: token,
  });
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = await signInInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "invalid inputs",
    });
  }
  const user = await prisma.user.findUnique({
    where: {
      email: body.username,
      password: body.password,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({ error: "user not found" });
  }

  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ jwt });
});

const authorizationMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header("Authorization") || "";
  if (authHeader == "") {
    c.status(404);
    return c.json({
      message: "Token Not Found",
    });
  }
  try {
    const user = await verify(authHeader, c.env.JWT_SECRET);
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
};

userRouter.get("/user_details", authorizationMiddleware, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.req.query("id");
  if (!userId) {
    c.status(411);
    return c.json({
      message: "invalid inputs",
    });
  }
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({ error: "user not found" });
  }

  return c.json(user);
});

userRouter.post("/changePassword", authorizationMiddleware, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  if (!body.id || !body.password) {
    c.status(411);
    return c.json({
      message: "invalid inputs",
    });
  }
  const user = await prisma.user.update({
    where: {
      id: body.id,
    },
    data: {
      password: body.password,
    },
  });

  if (!user) {
    c.status(417);
    return c.json({ error: "Error Updating password" });
  }

  return c.json({ Response: "password changed successfully" });
});

userRouter.post("/updateUserDetails", authorizationMiddleware, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  if (!body.id) {
    c.status(411);
    return c.json({
      message: "invalid inputs: id is required",
    });
  }

  const data: Partial<{ name: string; about: string }> = {};
  if (body.name) data.name = body.name;
  if (body.about) data.about = body.about;

  if (Object.keys(data).length === 0) {
    c.status(411);
    return c.json({
      message: "no fields to update",
    });
  }

  try {
    const user = await prisma.user.update({
      where: {
        id: body.id,
      },
      data,
    });

    return c.json({ Response: "User details updated successfully" });
  } catch (error: unknown) {
    c.status(417);
    return c.json({
      error: "Error updating user details",
      details: (error as Error).message,
    });
  }
});
