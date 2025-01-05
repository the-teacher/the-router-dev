import { Request, Response, NextFunction } from "express";

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  try {
    // Имитация асинхронной проверки токена
    await new Promise((resolve) => setTimeout(resolve, 100));

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    if (token !== "Bearer valid-token") {
      return res.status(401).json({ error: "Invalid token" });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: "Auth check failed" });
  }
};

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const role = req.headers["x-user-role"];

  try {
    // Имитация асинхронной проверки роли
    await new Promise((resolve) => setTimeout(resolve, 100));

    if (role !== "admin") {
      return res.status(403).json({ error: "Admin access required" });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: "Role check failed" });
  }
};
