import { Request, Response } from "express";

export const perform = (req: Request, res: Response) => {
  res.json({
    status: "success",
    message: "Post deleted successfully",
    id: req.params.id,
  });
};
