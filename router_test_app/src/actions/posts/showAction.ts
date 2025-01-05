import { Request, Response } from "express";

export const perform = (req: Request, res: Response) => {
  res.json({
    post: {
      id: req.params.id,
      title: "Sample Post",
      content: "This is a sample post content",
    },
  });
};
