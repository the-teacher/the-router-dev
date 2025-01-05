import { Request, Response, NextFunction } from "express";

export const validatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Имитация асинхронной валидации
    await new Promise((resolve) => setTimeout(resolve, 100));

    const { title, content } = req.body;

    if (!title || title.length < 3) {
      return res
        .status(400)
        .json({ error: "Title must be at least 3 characters long" });
    }

    if (!content || content.length < 10) {
      return res
        .status(400)
        .json({ error: "Content must be at least 10 characters long" });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: "Validation failed" });
  }
};
