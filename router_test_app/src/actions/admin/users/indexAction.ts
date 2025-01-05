import { Request, Response } from "express";

export const perform = (req: Request, res: Response) => {
  res.json({
    admin_users: [
      { id: 1, name: "John", role: "admin" },
      { id: 2, name: "Jane", role: "moderator" },
    ],
  });
};
