# Router Test App

Демонстрационное приложение для `@the-teacher/the-router`.

## Установка и запуск

### Зависимости

- Node.js >= 14
- npm или yarn
- TypeScript

### Установка

```bash
# Клонирование репозитория
git clone <repository-url>
cd router_test_app

# Установка зависимостей
npm install
# или
yarn install
```

### Запуск

```bash
# Режим разработки с автоперезагрузкой
npm run dev
# или
yarn dev

# Сборка проекта
npm run build
# или
yarn build

# Запуск собранного проекта
npm start
# или
yarn start
```

Приложение будет доступно по адресу: `http://localhost:3000`

## Роутинг

```typescript
// routes/index.ts
import { root, get, post, scope, resources } from "@the-teacher/the-router";
import { checkAuth, isAdmin } from "../middleware/auth";
import { validatePost } from "../middleware/validation";

// Корневой маршрут (отображает список всех маршрутов)
root("index#home");

// Защищенные маршруты с middleware
get("/posts/draft", [checkAuth], "posts#draft");
get("/posts/private", [checkAuth], "posts#private");
post("/posts/:id/publish", [checkAuth, validatePost], "posts#publish");

// Административные маршруты с множественными middleware
scope("admin", () => {
  resources("users");
  get("/posts/pending", [checkAuth, isAdmin], "admin/posts#pending");
  post("/posts/:id/approve", [checkAuth, isAdmin], "admin/posts#approve");
});

// Публичные маршруты
resources("users");
resources("posts");
```

### Доступные маршруты

#### Публичные маршруты

- `GET /` - домашняя страница со списком маршрутов
- `GET /users` - список пользователей
- `GET /users/new` - форма создания пользователя
- `GET /users/:id` - просмотр пользователя
- `GET /users/:id/edit` - форма редактирования пользователя
- `POST /users` - создание пользователя
- `PUT /users/:id` - обновление пользователя
- `DELETE /users/:id` - удаление пользователя
- `GET /posts` - список постов
- `GET /posts/new` - форма создания поста
- `GET /posts/:id` - просмотр поста
- `GET /posts/:id/edit` - форма редактирования поста
- `POST /posts` - создание поста
- `PUT /posts/:id` - обновление поста
- `DELETE /posts/:id` - удаление поста

#### Защищенные маршруты (требуют авторизации)

- `GET /posts/draft` - черновики постов
- `GET /posts/private` - приватные посты
- `POST /posts/:id/publish` - публикация поста

#### Административные маршруты (требуют роли админа)

- `GET /admin/users` - список пользователей в админке
- `GET /admin/users/new` - форма создания пользователя в админке
- `GET /admin/users/:id` - просмотр пользователя в админке
- `GET /admin/users/:id/edit` - форма редактирования пользователя в админке
- `POST /admin/users` - создание пользователя в админке
- `PUT /admin/users/:id` - обновление пользователя в админке
- `DELETE /admin/users/:id` - удаление пользователя в админке
- `GET /admin/posts/pending` - ожидающие публикации посты
- `POST /admin/posts/:id/approve` - одобрение поста

### Примеры запросов

```bash
# Публичные маршруты
curl http://localhost:3000/users
curl http://localhost:3000/posts/1

# Защищенные маршруты
curl http://localhost:3000/posts/draft \
  -H "Authorization: Bearer valid-token"

curl http://localhost:3000/posts/1/publish \
  -H "Authorization: Bearer valid-token" \
  -H "Content-Type: application/json" \
  -d '{"title": "Post Title", "content": "Post content"}'

# Административные маршруты
curl http://localhost:3000/admin/posts/pending \
  -H "Authorization: Bearer valid-token" \
  -H "x-user-role: admin"

curl http://localhost:3000/admin/posts/1/approve \
  -H "Authorization: Bearer valid-token" \
  -H "x-user-role: admin"
```

## Структура проекта

```
src/
  ├── index.ts                    # Точка входа приложения
  ├── routes/
  │   └── index.ts               # Определение маршрутов
  ├── middleware/
  │   ├── auth.ts                # Middleware авторизации
  │   └── validation.ts          # Middleware валидации
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
          ├── users/             # Ресурс users в админке
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

## Примеры Actions

### Базовый Action

Минимальная структура action файла:

```typescript
// src/actions/basic/simpleAction.ts
import { Request, Response } from "express";

export const perform = (req: Request, res: Response) => {
  res.json({ message: "Hello from simple action!" });
};
```

### Типовой Action с обработкой ошибок

Пример полноценного action с обработкой ошибок и валидацией:

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

    // Валидация
    if (!userData.name || !userData.email) {
      return res.status(400).json({
        status: "error",
        message: "Name and email are required",
      });
    }

    // Имитация сохранения в БД
    const user = {
      id: Math.floor(Math.random() * 1000),
      ...userData,
      createdAt: new Date(),
    };

    // Успешный ответ
    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    // Обработка ошибок
    console.error("Create user error:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
```

### Асинхронный Action с Middleware

Пример защищенного action с асинхронными операциями:

```typescript
// src/actions/posts/draftAction.ts
import { Request, Response } from "express";

export const perform = async (req: Request, res: Response) => {
  try {
    // Middleware checkAuth уже проверил авторизацию
    const userId = req.headers["user-id"]; // Установлено в middleware

    // Имитация асинхронного запроса к БД
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

Каждый action:

- Экспортирует функцию `perform`
- Принимает `Request` и `Response` из Express
- Может быть синхронным или асинхронным
- Отвечает за одно конкретное действие
- Возвращает данные в формате JSON
- Обрабатывает возможные ошибки

## Тестирование

### Используемые библиотеки

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

### Настройка тестов

```typescript
// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testMatch: ["**/*.test.ts"],
};
```

### Примеры тестов

#### Тестирование Action

```typescript
// src/actions/users/showAction.test.ts
import request from "supertest";
import express from "express";
import { getRouter } from "@the-teacher/the-router";

describe("Show User Action", () => {
  let app: express.Express;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use(getRouter());
  });

  it("should return user by id", async () => {
    const response = await request(app)
      .get("/users/1")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toHaveProperty("id", "1");
  });

  it("should handle non-existent user", async () => {
    const response = await request(app)
      .get("/users/999")
      .expect("Content-Type", /json/)
      .expect(404);

    expect(response.body).toHaveProperty("error");
  });
});
```

#### Тестирование Middleware

```typescript
// src/middleware/auth.test.ts
import request from "supertest";
import express from "express";
import { getRouter } from "@the-teacher/the-router";

describe("Auth Middleware", () => {
  let app: express.Express;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use(getRouter());
  });

  it("should allow access with valid token", async () => {
    const response = await request(app)
      .get("/posts/draft")
      .set("Authorization", "Bearer valid-token")
      .expect(200);

    expect(response.body).toHaveProperty("drafts");
  });

  it("should deny access without token", async () => {
    const response = await request(app).get("/posts/draft").expect(401);

    expect(response.body).toHaveProperty("error", "No token provided");
  });

  it("should deny access with invalid token", async () => {
    const response = await request(app)
      .get("/posts/draft")
      .set("Authorization", "Bearer invalid-token")
      .expect(401);

    expect(response.body).toHaveProperty("error", "Invalid token");
  });
});
```

#### Тестирование Protected Routes

```typescript
// src/routes/admin.test.ts
import request from "supertest";
import express from "express";
import { getRouter } from "@the-teacher/the-router";

describe("Admin Routes", () => {
  let app: express.Express;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use(getRouter());
  });

  it("should allow admin access", async () => {
    const response = await request(app)
      .get("/admin/posts/pending")
      .set("Authorization", "Bearer valid-token")
      .set("x-user-role", "admin")
      .expect(200);

    expect(response.body).toHaveProperty("pending_posts");
  });

  it("should deny non-admin access", async () => {
    const response = await request(app)
      .get("/admin/posts/pending")
      .set("Authorization", "Bearer valid-token")
      .set("x-user-role", "user")
      .expect(403);

    expect(response.body).toHaveProperty("error", "Admin access required");
  });
});
```

### Запуск тестов

```bash
# Запуск всех тестов
npm test

# Запуск тестов с watch режимом
npm run test:watch

# Запуск тестов с coverage отчетом
npm run test:coverage

# Запуск конкретного теста
npm test -- src/actions/users/showAction.test.ts
```

### Советы по тестированию

1. Группируйте тесты по функциональности используя `describe`
2. Изолируйте тесты используя `beforeEach`
3. Проверяйте как успешные, так и ошибочные сценарии
4. Используйте моки для внешних зависимостей
5. Тестируйте статус ответа и структуру данных
6. Проверяйте работу middleware и защищенных маршрутов
7. Следите за покрытием кода тестами
