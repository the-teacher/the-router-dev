import { Request, Response } from "express";

export const perform = (req: Request, res: Response) => {
  res.json({
    status: "success",
    message: "Post updated successfully",
    post: {
      id: req.params.id,
      ...req.body,
    },
  });
};
