import { Request, Response } from "express";

export const perform = (req: Request, res: Response) => {
  res.json({
    form: {
      action: `/posts/${req.params.id}`,
      method: "PUT",
      fields: {
        title: { type: "text", required: true, value: "Sample Post" },
        content: { type: "textarea", required: true, value: "Sample content" },
      },
    },
  });
};
