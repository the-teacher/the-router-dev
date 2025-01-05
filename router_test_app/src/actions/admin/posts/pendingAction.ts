import { Request, Response } from "express";

export const perform = async (req: Request, res: Response) => {
  // Имитация получения ожидающих постов
  await new Promise((resolve) => setTimeout(resolve, 100));

  res.json({
    pending_posts: [
      { id: 1, title: "Pending 1", author: "user1" },
      { id: 2, title: "Pending 2", author: "user2" },
    ],
  });
};
