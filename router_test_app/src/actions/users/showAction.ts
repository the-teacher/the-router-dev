import { Request, Response } from "express";

export const perform = (req: Request, res: Response) => {
  res.json({
    user: {
      id: req.params.id,
      name: "John Doe",
    },
  });
};
