import { root, get, post, scope, resources } from "the-router";

// Root route
root("index#home");

// RESTful resources for users and posts
resources("users");
resources("posts");

// Admin routes
scope("admin", () => {
  resources("users");
});
