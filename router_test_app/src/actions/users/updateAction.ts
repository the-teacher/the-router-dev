import { Request, Response } from "express";

export const perform = (req: Request, res: Response) => {
  res.json({
    status: "success",
    message: "User updated successfully",
    user: {
      id: req.params.id,
      ...req.body,
    },
  });
};
