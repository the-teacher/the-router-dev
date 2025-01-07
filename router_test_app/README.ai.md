# Router Test App

Demo application for `@the-teacher/the-router`.

## Installation and Launch

### Dependencies

- Node.js >= 14
- npm or yarn
- TypeScript

### Installation

```bash
# Clone repository
git clone <repository-url>
cd router_test_app

# Install dependencies
npm install
# or
yarn install
```

### Launch

```bash
# Development mode with auto-reload
npm run dev
# or
yarn dev

# Build project
npm run build
# or
yarn build

# Run built project
npm start
# or
yarn start
```

The application will be available at: `http://localhost:3000`

## Routing

```typescript
// routes/index.ts
import { root, get, post, scope, resources } from "@the-teacher/the-router";
import { checkAuth, isAdmin } from "../middleware/auth";
import { validatePost } from "../middleware/validation";

// Root route (displays list of all routes)
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
```

### Available Routes

#### Public Routes

- `GET /` - home page with routes list
- `GET /users` - users list
- `GET /users/new` - user creation form
- `GET /users/:id` - view user
- `GET /users/:id/edit` - user edit form
- `POST /users` - create user
- `PUT /users/:id` - update user
- `DELETE /users/:id` - delete user
- `GET /posts` - posts list
- `GET /posts/new` - post creation form
- `GET /posts/:id` - view post
- `GET /posts/:id/edit` - post edit form
- `POST /posts` - create post
- `PUT /posts/:id` - update post
- `DELETE /posts/:id` - delete post

#### Protected Routes (require authentication)

- `GET /posts/draft` - draft posts
- `GET /posts/private` - private posts
- `POST /posts/:id/publish` - publish post

#### Admin Routes (require admin role)

- `GET /admin/users` - users list in admin panel
- `GET /admin/users/new` - user creation form in admin panel
- `GET /admin/users/:id` - view user in admin panel
- `GET /admin/users/:id/edit` - user edit form in admin panel
- `POST /admin/users` - create user in admin panel
- `PUT /admin/users/:id` - update user in admin panel
- `DELETE /admin/users/:id` - delete user in admin panel
- `GET /admin/posts/pending` - pending posts
- `POST /admin/posts/:id/approve` - approve post

### Request Examples

```bash
# Public routes
curl http://localhost:3000/users
curl http://localhost:3000/posts/1

# Protected routes
curl http://localhost:3000/posts/draft \
  -H "Authorization: Bearer valid-token"

curl http://localhost:3000/posts/1/publish \
  -H "Authorization: Bearer valid-token" \
  -H "Content-Type: application/json" \
  -d '{"title": "Post Title", "content": "Post content"}'

# Admin routes
curl http://localhost:3000/admin/posts/pending \
  -H "Authorization: Bearer valid-token" \
  -H "x-user-role: admin"

curl http://localhost:3000/admin/posts/1/approve \
  -H "Authorization: Bearer valid-token" \
  -H "x-user-role: admin"
```

## Project Structure

```
src/
  ├── index.ts                    # Application entry point
  ├── routes/
  │   └── index.ts               # Routes definition
  ├── middleware/
  │   ├── auth.ts                # Authorization middleware
  │   └── validation.ts          # Validation middleware
  └── actions/
      ├── index/
      │   └── homeAction.ts      # GET /
      ├── users/
      │   ├── indexAction.ts     # GET /users
      │   ├── showAction.ts      # GET /users/:id
      │   ├── newAction.ts       # GET /users/new
      │   ├── createAction.ts    # POST /users
      │   ├── editAction.ts      # GET /users/:id/edit
      │   ├── updateAction.ts    # PUT /users/:id
      │   └── destroyAction.ts   # DELETE /users/:id
      ├── posts/
      │   ├── indexAction.ts     # GET /posts
      │   ├── showAction.ts      # GET /posts/:id
      │   ├── newAction.ts       # GET /posts/new
      │   ├── createAction.ts    # POST /posts
      │   ├── editAction.ts      # GET /posts/:id/edit
      │   ├── updateAction.ts    # PUT /posts/:id
      │   ├── destroyAction.ts   # DELETE /posts/:id
      │   ├── draftAction.ts     # GET /posts/draft (protected)
      │   ├── privateAction.ts   # GET /posts/private (protected)
      │   └── publishAction.ts   # POST /posts/:id/publish (protected)
      └── admin/
          ├── users/             # Users resource in admin panel
          │   ├── indexAction.ts     # GET /admin/users
          │   ├── showAction.ts      # GET /admin/users/:id
          │   ├── newAction.ts       # GET /admin/users/new
          │   ├── createAction.ts    # POST /admin/users
          │   ├── editAction.ts      # GET /admin/users/:id/edit
          │   ├── updateAction.ts    # PUT /admin/users/:id
          │   └── destroyAction.ts   # DELETE /admin/users/:id
          └── posts/
              ├── pendingAction.ts   # GET /admin/posts/pending
              └── approveAction.ts   # POST /admin/posts/:id/approve
```

## Action Examples

### Basic Action

Minimal action file structure:

```typescript
// src/actions/basic/simpleAction.ts
import { Request, Response } from "express";

export const perform = (req: Request, res: Response) => {
  res.json({ message: "Hello from simple action!" });
};
```

### Typical Action with Error Handling

Example of a full-featured action with error handling and validation:

```typescript
// src/actions/users/createAction.ts
import { Request, Response } from "express";

interface UserData {
  name: string;
  email: string;
}

export const perform = async (req: Request, res: Response) => {
  try {
    const userData: UserData = req.body;

    // Validation
    if (!userData.name || !userData.email) {
      return res.status(400).json({
        status: "error",
        message: "Name and email are required",
      });
    }

    // DB save simulation
    const user = {
      id: Math.floor(Math.random() * 1000),
      ...userData,
      createdAt: new Date(),
    };

    // Success response
    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    // Error handling
    console.error("Create user error:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
```

### Asynchronous Action with Middleware

Example of a protected action with asynchronous operations:

```typescript
// src/actions/posts/draftAction.ts
import { Request, Response } from "express";

export const perform = async (req: Request, res: Response) => {
  try {
    // checkAuth middleware has already verified authorization
    const userId = req.headers["user-id"]; // Set in middleware

    // Async DB request simulation
    await new Promise((resolve) => setTimeout(resolve, 100));

    const drafts = [
      { id: 1, title: "Draft 1", userId },
      { id: 2, title: "Draft 2", userId },
    ];

    res.json({
      status: "success",
      data: drafts,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch drafts",
    });
  }
};
```

Each action:

- Exports a `perform` function
- Accepts `Request` and `Response` from Express
- Can be synchronous or asynchronous
- Is responsible for a single specific action
- Returns data in JSON format
- Handles possible errors

## Testing

### Used Libraries

```json
{
  "devDependencies": {
    "jest": "^29.7.0",
    "supertest": "^6.3.4",
    "ts-jest": "^29.1.2",
    "@types/jest": "^29.5.12",
    "@types/supertest": "^6.0.2"
  }
}
```

### Test Configuration

```typescript
// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testMatch: ["**/*.test.ts"],
};
```

### Testing Tips

1. Group tests by functionality using `describe`
2. Isolate tests using `beforeEach`
3. Test both successful and error scenarios
4. Use mocks for external dependencies
5. Test response status and data structure
6. Verify middleware and protected routes functionality
7. Monitor code coverage
