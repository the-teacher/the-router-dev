import { Request, Response } from "express";

export const perform = async (req: Request, res: Response) => {
  // Имитация получения приватных постов
  await new Promise((resolve) => setTimeout(resolve, 100));

  res.json({
    private_posts: [
      { id: 1, title: "Private 1", content: "Secret content 1" },
      { id: 2, title: "Private 2", content: "Secret content 2" },
    ],
  });
};
