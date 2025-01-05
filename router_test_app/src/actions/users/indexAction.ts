import { Request, Response } from "express";

export const perform = (req: Request, res: Response) => {
  res.json({
    users: [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
    ],
  });
};
