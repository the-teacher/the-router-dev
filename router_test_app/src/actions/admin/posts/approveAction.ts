import { Request, Response } from "express";

export const perform = async (req: Request, res: Response) => {
  const { id } = req.params;

  // Имитация одобрения поста
  await new Promise((resolve) => setTimeout(resolve, 100));

  res.json({
    status: "success",
    message: `Post ${id} approved successfully`,
  });
};
