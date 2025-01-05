import { Request, Response } from "express";

export const perform = (req: Request, res: Response) => {
  res.json({
    status: "success",
    message: "User created successfully",
    user: {
      id: Math.floor(Math.random() * 1000),
      ...req.body,
    },
  });
};
