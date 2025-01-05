import { Request, Response } from "express";
import { layout } from "../../views/layouts/main";
import { render } from "../../views/home/index";

export const perform = (req: Request, res: Response) => {
  const routes = [
    { path: "/", name: "Home" },

    // Users routes
    { path: "/users", name: "Users List" },
    { path: "/users/new", name: "New User Form" },
    { path: "/users/1", name: "Show User Example (ID: 1)" },
    { path: "/users/1/edit", name: "Edit User Example (ID: 1)" },

    // Posts routes
    { path: "/posts", name: "Posts List" },
    { path: "/posts/new", name: "New Post Form" },
    { path: "/posts/1", name: "Show Post Example (ID: 1)" },
    { path: "/posts/1/edit", name: "Edit Post Example (ID: 1)" },
    { path: "/posts/draft", name: "Draft Posts (Protected)" },
    { path: "/posts/private", name: "Private Posts (Protected)" },
    {
      path: "/posts/:id/publish",
      name: "Publish Post (Protected)",
      method: "POST",
    },

    // Admin routes
    { path: "/admin/users", name: "Admin: Users List" },
    { path: "/admin/users/new", name: "Admin: New User Form" },
    { path: "/admin/users/1", name: "Admin: Show User Example (ID: 1)" },
    { path: "/admin/users/1/edit", name: "Admin: Edit User Example (ID: 1)" },
    { path: "/admin/posts/pending", name: "Admin: Pending Posts (Protected)" },
    {
      path: "/admin/posts/:id/approve",
      name: "Admin: Approve Post (Protected)",
      method: "POST",
    },
  ];

  const html = layout(render(routes));
  res.send(html);
};
