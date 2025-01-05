import { Request, Response } from "express";

export const perform = (req: Request, res: Response) => {
  res.json({
    form: {
      action: "/posts",
      method: "POST",
      fields: {
        title: { type: "text", required: true },
        content: { type: "textarea", required: true },
      },
    },
  });
};
