# METRODA Admin Dashboard - Архитектура

## Обзор

Административная панель METRODA построена как full-stack приложение с разделением на фронтенд и бэкенд части.

## Технологический стек

### Frontend (Next.js)

**Framework & Language**
- Next.js 15 (App Router) - React фреймворк с SSR/SSG
- TypeScript 5.6 - Типизация кода
- React 19 - UI библиотека

**Styling & UI**
- Tailwind CSS - Utility-first CSS
- shadcn/ui - Компоненты UI
- Lucide React - Иконки
- class-variance-authority - Варианты стилей компонентов

**State Management**
- Zustand - Глобальное состояние
- TanStack Query (React Query) - Server state management
- React Context - Локальное состояние

**Data Fetching & API**
- Axios - HTTP клиент
- Socket.io Client - WebSocket для real-time

**DX & Tools**
- ESLint - Линтинг кода
- TypeScript Compiler - Проверка типов

### Backend (NestJS) - В разработке

**Framework & Language**
- NestJS - Node.js framework
- TypeScript - Типизация
- Express - HTTP сервер

**Database & ORM**
- PostgreSQL - Реляционная БД
- TypeORM - ORM для TypeScript

**Real-time & Jobs**
- Socket.io - WebSocket сервер
- Bull - Очереди задач
- Redis - Кэширование и pub/sub

**Security & Auth**
- JWT - Токены авторизации
- bcrypt - Хеширование паролей
- helmet - Security headers

## Архитектура системы

### Общая схема

```
┌─────────────────────────────────────────────────┐
│                   Internet                       │
└──────────────────────┬──────────────────────────┘
                       │
                       │ HTTPS
                       │
┌──────────────────────▼──────────────────────────┐
│              Nginx Reverse Proxy                 │
│                 (Load Balancer)                  │
└──────────┬─────────────────────┬─────────────────┘
           │                     │
           │ :4000               │ :3100
           │                     │
┌──────────▼───────────┐  ┌─────▼──────────────────┐
│  Next.js Frontend    │  │   Admin Backend API    │
│   (SSR/Static)       │  │     (NestJS)           │
│  ┌───────────────┐   │  │  ┌──────────────────┐  │
│  │  Dashboard    │   │  │  │  Task Manager    │  │
│  │  Users        │───┼──┼─▶│  Chat Service    │  │
│  │  Content      │   │  │  │  Analytics       │  │
│  │  Finances     │   │  │  └──────────────────┘  │
│  │  Tasks        │   │  │                        │
│  │  Chat         │   │  │  ┌──────────────────┐  │
│  └───────────────┘   │  │  │  WebSocket       │  │
│                      │◀─┼──│  Server          │  │
└──────────┬───────────┘  │  └──────────────────┘  │
           │              └───────┬─────────────────┘
           │                      │
           │ REST API             │ PostgreSQL
           │                      │
┌──────────▼──────────────────────▼─────────────────┐
│           METRODA Microservices                    │
│  ┌────────────┐ ┌────────────┐ ┌──────────────┐  │
│  │   Auth     │ │  Content   │ │ Subscription │  │
│  │  Service   │ │  Service   │ │   Service    │  │
│  │   :3001    │ │   :3002    │ │    :3003     │  │
│  └─────┬──────┘ └─────┬──────┘ └──────┬───────┘  │
│        │              │               │           │
│        └──────────────┼───────────────┘           │
│                       │                           │
│              ┌────────▼────────┐                  │
│              │   PostgreSQL    │                  │
│              │   (Multiple DBs)│                  │
│              └─────────────────┘                  │
└───────────────────────────────────────────────────┘
```

## Структура Frontend приложения

### Организация кода

```
apps/frontend/src/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Auth routes group
│   │   ├── login/
│   │   └── layout.tsx
│   ├── dashboard/           # Dashboard routes
│   │   ├── page.tsx         # Main dashboard
│   │   ├── users/           # Users management
│   │   ├── content/         # Content moderation
│   │   ├── finances/        # Financial analytics
│   │   ├── tasks/           # Task management
│   │   ├── chat/            # Chat system
│   │   ├── settings/        # Settings
│   │   └── layout.tsx       # Dashboard layout
│   ├── globals.css
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home (redirect)
│   └── providers.tsx        # Client providers
│
├── components/              # React components
│   ├── layout/             # Layout components
│   │   ├── sidebar.tsx     # Navigation sidebar
│   │   ├── header.tsx      # Top header
│   │   └── footer.tsx
│   ├── ui/                 # Base UI components (shadcn)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   └── common/             # Shared components
│       ├── data-table.tsx
│       ├── stat-card.tsx
│       └── ...
│
├── features/               # Feature modules
│   ├── users/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api/
│   │   └── types.ts
│   ├── content/
│   ├── tasks/
│   └── chat/
│
├── lib/                    # Utilities
│   ├── utils.ts           # Helper functions
│   ├── api-client.ts      # API client setup
│   └── constants.ts
│
├── hooks/                  # Custom React hooks
│   ├── useAuth.ts
│   ├── useDebounce.ts
│   └── useWebSocket.ts
│
├── store/                  # Zustand stores
│   ├── useAuthStore.ts
│   ├── useChatStore.ts
│   └── useTaskStore.ts
│
└── types/                  # TypeScript types
    ├── index.ts           # Common types
    └── api.ts             # API types
```

### Паттерны и подходы

#### 1. Feature-first организация

Каждый модуль (feature) содержит всё необходимое:
```
features/users/
├── components/         # UI компоненты
│   ├── UserList.tsx
│   ├── UserCard.tsx
│   └── UserModal.tsx
├── hooks/             # Хуки для работы с данными
│   ├── useUsers.ts
│   └── useUserActions.ts
├── api/               # API запросы
│   └── users-api.ts
├── types.ts           # Типы модуля
└── utils.ts           # Утилиты модуля
```

#### 2. Server и Client компоненты

- **Server Components** (по умолчанию) - рендерятся на сервере
- **Client Components** (`'use client'`) - интерактивные компоненты

```typescript
// Server Component (default)
async function UsersPage() {
  const users = await fetchUsers(); // Fetches on server
  return <UserList users={users} />;
}

// Client Component
'use client';
function UserList({ users }) {
  const [search, setSearch] = useState('');
  // Interactive logic
}
```

#### 3. Data Fetching стратегии

**React Query для клиентских запросов:**
```typescript
function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => api.get('/users'),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
```

**Server-side fetching для SEO:**
```typescript
async function DashboardPage() {
  const stats = await fetchDashboardStats();
  return <Dashboard stats={stats} />;
}
```

#### 4. State Management

**Global State (Zustand):**
```typescript
// store/useAuthStore.ts
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  login: (user, token) => set({ user, token }),
  logout: () => set({ user: null, token: null }),
}));
```

**Server State (React Query):**
- Кэширование запросов
- Автоматическая ревалидация
- Оптимистичные обновления

**Local State (useState, useReducer):**
- Для UI состояния компонентов

## Backend Architecture (Планируется)

### Модульная структура NestJS

```
apps/backend/src/
├── main.ts                    # Entry point
├── app.module.ts              # Root module
│
├── modules/
│   ├── auth/                  # Authentication
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   └── guards/
│   │
│   ├── tasks/                 # Task management
│   │   ├── tasks.controller.ts
│   │   ├── tasks.service.ts
│   │   ├── tasks.module.ts
│   │   └── entities/
│   │       └── task.entity.ts
│   │
│   ├── chat/                  # Real-time chat
│   │   ├── chat.gateway.ts    # WebSocket
│   │   ├── chat.service.ts
│   │   └── chat.module.ts
│   │
│   └── analytics/             # Analytics
│       ├── analytics.controller.ts
│       ├── analytics.service.ts
│       └── analytics.module.ts
│
├── common/                    # Shared code
│   ├── decorators/
│   ├── filters/
│   ├── guards/
│   ├── interceptors/
│   └── pipes/
│
└── config/                    # Configuration
    ├── database.config.ts
    └── app.config.ts
```

### API Design

**RESTful endpoints:**
```
GET    /api/tasks              # List tasks
POST   /api/tasks              # Create task
GET    /api/tasks/:id          # Get task
PATCH  /api/tasks/:id          # Update task
DELETE /api/tasks/:id          # Delete task
```

**WebSocket events:**
```typescript
// Server emits
socket.emit('task:created', task);
socket.emit('message:new', message);
socket.emit('notification:new', notification);

// Client listens
socket.on('task:created', handleNewTask);
socket.on('message:new', handleNewMessage);
```

## Data Flow

### 1. Пользователь → Frontend

```
User Action → Component → Event Handler → API Call
```

### 2. Frontend → Backend

```
React Component
  → React Query / Axios
    → Next.js API Route (optional proxy)
      → Admin Backend API
        → Database / External Services
```

### 3. Real-time updates

```
Backend Event
  → WebSocket Server (Socket.io)
    → Connected Clients
      → React Component Update
```

## Security

### Frontend
- JWT токены в httpOnly cookies
- CSRF защита
- XSS sanitization
- Input validation

### Backend
- JWT authentication
- Role-based access control (RBAC)
- Rate limiting
- SQL injection protection (TypeORM)
- Helmet.js security headers

## Performance Optimization

### Frontend
- Next.js SSR/SSG для быстрой загрузки
- Code splitting по роутам
- Image optimization (next/image)
- React Query кэширование
- Lazy loading компонентов

### Backend
- Redis кэширование
- Database indexes
- Query optimization
- Connection pooling
- Compression (gzip)

## Deployment

### Development
```bash
# Frontend
cd apps/frontend && npm run dev

# Backend
cd apps/backend && npm run start:dev
```

### Production
```bash
# Frontend build
npm run build
npm run start

# Backend build
npm run build
npm run start:prod
```

### Docker
```yaml
services:
  frontend:
    build: ./apps/frontend
    ports:
      - "4000:4000"

  backend:
    build: ./apps/backend
    ports:
      - "3100:3100"
    depends_on:
      - postgres
      - redis
```

## Мониторинг и логирование

- **Frontend**: Sentry для error tracking
- **Backend**: Winston logger + ELK stack
- **Performance**: Lighthouse CI
- **Uptime**: Monitoring сервисы

## Будущие улучшения

1. Микрофронтенды (Module Federation)
2. GraphQL вместо REST
3. Serverless функции для тяжелых операций
4. PWA функциональность
5. Mobile приложения (React Native)

---

**Документ обновлен: 22 октября 2024**
