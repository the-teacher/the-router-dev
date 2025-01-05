import { Request, Response } from "express";

export const perform = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Имитация публикации поста
  await new Promise((resolve) => setTimeout(resolve, 100));

  res.json({
    status: "success",
    message: `Post ${id} published successfully`,
  });
};
