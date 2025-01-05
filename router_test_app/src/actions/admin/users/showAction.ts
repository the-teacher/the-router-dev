import { Request, Response } from "express";

export const perform = (req: Request, res: Response) => {
  res.json({
    admin_user: {
      id: req.params.id,
      name: "John Doe",
      role: "admin",
      lastLogin: "2024-03-15",
    },
  });
};
