import { Request, Response } from "express";

export const perform = (req: Request, res: Response) => {
  res.json({
    form: {
      action: "/users",
      method: "POST",
      fields: {
        name: { type: "text", required: true },
        email: { type: "email", required: true },
      },
    },
  });
};