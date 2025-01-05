import { Request, Response } from "express";

export const perform = (req: Request, res: Response) => {
  res.json({
    status: "success",
    message: "User deleted successfully",
    id: req.params.id,
  });
};
