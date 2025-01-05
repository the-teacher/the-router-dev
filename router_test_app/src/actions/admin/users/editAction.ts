import { Request, Response } from "express";

export const perform = (req: Request, res: Response) => {
  res.json({
    form: {
      action: `/admin/users/${req.params.id}`,
      method: "PUT",
      fields: {
        name: { type: "text", required: true, value: "John Doe" },
        email: { type: "email", required: true, value: "john@example.com" },
        role: {
          type: "select",
          required: true,
          options: ["admin", "moderator", "user"],
          value: "admin",
        },
      },
    },
  });
};
