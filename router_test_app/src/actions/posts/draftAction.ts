import { Request, Response } from "express";

export const perform = async (req: Request, res: Response) => {
  // Имитация получения черновиков из БД
  await new Promise((resolve) => setTimeout(resolve, 100));

  res.json({
    drafts: [
      { id: 1, title: "Draft 1", content: "Content 1" },
      { id: 2, title: "Draft 2", content: "Content 2" },
    ],
  });
};
