import { root, get, post, scope, resources } from "the-router";
import { checkAuth, isAdmin } from "../middleware/auth";
import { validatePost } from "../middleware/validation";

// Root route
root("index#home");

// Protected routes with middleware
get("/posts/draft", [checkAuth], "posts#draft");
get("/posts/private", [checkAuth], "posts#private");
post("/posts/:id/publish", [checkAuth, validatePost], "posts#publish");

// Admin routes with multiple middleware
scope("admin", () => {
  resources("users");
  get("/posts/pending", [checkAuth, isAdmin], "admin/posts#pending");
  post("/posts/:id/approve", [checkAuth, isAdmin], "admin/posts#approve");
});

// Public routes
resources("users");
resources("posts");
