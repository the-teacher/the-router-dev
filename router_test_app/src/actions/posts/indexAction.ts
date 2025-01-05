import { Request, Response } from "express";

export const perform = (req: Request, res: Response) => {
  res.json({
    posts: [
      { id: 1, title: "First Post", content: "Hello!" },
      { id: 2, title: "Second Post", content: "World!" },
    ],
  });
};
