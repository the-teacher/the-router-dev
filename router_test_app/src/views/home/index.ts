interface Route {
  path: string;
  name: string;
}

const renderRouteSection = (title: string, content: string) => `
  <div class="route-section">
    <h2>${title}</h2>
    <ul>
      ${content}
    </ul>
  </div>
`;

const renderGetRoutes = (routes: Route[], prefix: string, exclude?: string) => {
  return routes
    .filter((route) => {
      const startsWithPrefix = route.path.startsWith(prefix);
      if (exclude) {
        return startsWithPrefix && !route.path.startsWith(exclude);
      }
      return startsWithPrefix;
    })
    .map((route) => {
      const isProtected =
        route.path.includes("/drafts") ||
        route.path.includes("/private") ||
        route.path.includes("/pending");
      const curlExample = isProtected
        ? `
        <div class="curl-example">curl -X GET http://localhost:3000${
          route.path
        } \\
     -H "Authorization: Bearer valid-token"${
       route.path.includes("/pending")
         ? ' \\\n     -H "x-user-role: admin"'
         : ""
     }</div>
        `
        : "";

      return `
    <li>
      <span class="method get">GET</span>
      <a href="${route.path}">${route.name}</a>
      <code>${route.path}</code>
      ${isProtected ? '<span class="protected">🔒 Protected</span>' : ""}
      ${curlExample}
    </li>
  `;
    })
    .join("");
};

const renderPostRoutes = (prefix: string, isAdmin: boolean = false) => {
  const routes = {
    "/": !isAdmin
      ? `
      <li>
        <span class="method post">POST</span>
        <span>Create User</span>
        <code>/users</code>
        <div class="curl-example">curl -X POST http://localhost:3000/users \\
     -H "Content-Type: application/json" \\
     -d '{"name": "John", "email": "john@example.com"}'</div>
      </li>`
      : "",
    "/posts": `
      <li>
        <span class="method post">POST</span>
        <span>Create Post</span>
        <code>/posts</code>
        <div class="curl-example">curl -X POST http://localhost:3000/posts \\
     -H "Content-Type: application/json" \\
     -d '{"title": "My Post", "content": "Post content"}'</div>
      </li>
      <li>
        <span class="method post">POST</span>
        <span>Publish Post</span>
        <code>/posts/:id/publish</code>
        <span class="protected">🔒 Protected</span>
        <div class="curl-example">curl -X POST http://localhost:3000/posts/1/publish \\
     -H "Content-Type: application/json" \\
     -H "Authorization: Bearer valid-token" \\
     -d '{"title": "My Post", "content": "Post content to publish"}'</div>
      </li>`,
    "/admin": `
      <li>
        <span class="method post">POST</span>
        <span>Create Admin User</span>
        <code>/admin/users</code>
        <div class="curl-example">curl -X POST http://localhost:3000/admin/users \\
     -H "Content-Type: application/json" \\
     -d '{"name": "Admin", "email": "admin@example.com", "role": "admin"}'</div>
      </li>
      <li>
        <span class="method post">POST</span>
        <span>Approve Post</span>
        <code>/admin/posts/:id/approve</code>
        <span class="protected">🔒 Protected</span>
        <div class="curl-example">curl -X POST http://localhost:3000/admin/posts/1/approve \\
     -H "Content-Type: application/json" \\
     -H "Authorization: Bearer valid-token" \\
     -H "x-user-role: admin"</div>
      </li>`,
  };
  return routes[prefix] || "";
};

const renderPutRoutes = (prefix: string, isAdmin: boolean = false) => {
  const routes = {
    "/": !isAdmin
      ? `
      <li>
        <span class="method put">PUT</span>
        <span>Update User</span>
        <code>/users/:id</code>
        <div class="curl-example">curl -X PUT http://localhost:3000/users/1 \\
     -H "Content-Type: application/json" \\
     -d '{"name": "Updated Name", "email": "updated@example.com"}'</div>
      </li>`
      : "",
    "/posts": `
      <li>
        <span class="method put">PUT</span>
        <span>Update Post</span>
        <code>/posts/:id</code>
        <div class="curl-example">curl -X PUT http://localhost:3000/posts/1 \\
     -H "Content-Type: application/json" \\
     -d '{"title": "Updated Title", "content": "Updated content"}'</div>
      </li>`,
    "/admin": `
      <li>
        <span class="method put">PUT</span>
        <span>Update Admin User</span>
        <code>/admin/users/:id</code>
        <div class="curl-example">curl -X PUT http://localhost:3000/admin/users/1 \\
     -H "Content-Type: application/json" \\
     -d '{"name": "Updated Admin", "email": "admin@example.com", "role": "moderator"}'</div>
      </li>`,
  };
  return routes[prefix] || "";
};

const renderDeleteRoutes = (prefix: string, isAdmin: boolean = false) => {
  const routes = {
    "/": !isAdmin
      ? `
      <li>
        <span class="method delete">DELETE</span>
        <span>Delete User</span>
        <code>/users/:id</code>
        <div class="curl-example">curl -X DELETE http://localhost:3000/users/1</div>
      </li>`
      : "",
    "/posts": `
      <li>
        <span class="method delete">DELETE</span>
        <span>Delete Post</span>
        <code>/posts/:id</code>
        <div class="curl-example">curl -X DELETE http://localhost:3000/posts/1</div>
      </li>`,
    "/admin": `
      <li>
        <span class="method delete">DELETE</span>
        <span>Delete Admin User</span>
        <code>/admin/users/:id</code>
        <div class="curl-example">curl -X DELETE http://localhost:3000/admin/users/1</div>
      </li>`,
  };
  return routes[prefix] || "";
};

const renderSection = (
  title: string,
  routes: Route[],
  prefix: string,
  exclude?: string,
  isAdmin: boolean = false
) => {
  const content = `
    ${renderGetRoutes(routes, prefix, exclude)}
    ${renderPostRoutes(prefix, isAdmin)}
    ${renderPutRoutes(prefix, isAdmin)}
    ${renderDeleteRoutes(prefix, isAdmin)}
  `;
  return renderRouteSection(title, content);
};

export const render = (routes: Route[]) => `
  <h1>Available Routes</h1>

  ${renderRouteSection("Root", renderGetRoutes(routes, "/").split("\n")[0])}
  ${renderSection("Users", routes, "/", "/admin")}
  ${renderSection("Posts", routes, "/posts")}
  ${renderSection("Admin Users", routes, "/admin", undefined, true)}
`;
