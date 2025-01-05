import { Request, Response } from "express";

export const perform = (req: Request, res: Response) => {
  res.json({
    status: "success",
    message: "Admin user updated successfully",
    admin_user: {
      id: req.params.id,
      ...req.body,
    },
  });
};
