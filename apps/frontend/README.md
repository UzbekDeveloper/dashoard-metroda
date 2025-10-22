# METRODA Admin Frontend

Административная панель для управления платформой METRODA.

## Технологический стек

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Charts**: Recharts
- **Drag & Drop**: DND Kit
- **WebSocket**: Socket.io Client

## Структура проекта

```
src/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Dashboard pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page (redirects to dashboard)
│   └── providers.tsx      # Client providers
├── components/            # React components
│   ├── layout/           # Layout components (Sidebar, Header)
│   └── ui/               # UI components (shadcn/ui)
├── features/             # Feature modules
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and helpers
├── store/                # Zustand stores
└── types/                # TypeScript types
```

## Основные модули

### 1. Дашборд
- Общая статистика платформы
- Ключевые метрики (пользователи, контент, доходы)
- Последняя активность
- Быстрые действия

### 2. Управление пользователями
- Список пользователей и авторов
- Просмотр профилей
- Блокировка/разблокировка
- Управление ролями

### 3. Модерация контента
- Просмотр всех публикаций
- Модерация новых постов
- Удаление нарушающего контента
- Управление комментариями

### 4. Финансовая аналитика
- Обзор доходов
- Отчеты по платежам
- Статистика подписок
- Выплаты авторам

### 5. Система задач (Kanban)
- Создание и управление задачами
- Kanban доска
- Назначение исполнителей
- Отслеживание прогресса

### 6. Чат
- Общение с пользователями
- Внутренний чат команды
- История сообщений
- Real-time уведомления

## Запуск проекта

### Установка зависимостей

```bash
cd apps/frontend
npm install
```

### Настройка окружения

Создайте файл `.env.local`:

```env
# API URLs
AUTH_SERVICE_URL=http://localhost:3001
CONTENT_SERVICE_URL=http://localhost:3002
SUBSCRIPTION_SERVICE_URL=http://localhost:3003
ADMIN_SERVICE_URL=http://localhost:3100

# App Configuration
NEXT_PUBLIC_APP_NAME=METRODA Admin
NEXT_PUBLIC_API_URL=http://localhost:4000/api

# WebSocket
NEXT_PUBLIC_WS_URL=ws://localhost:3100
```

### Запуск dev сервера

```bash
npm run dev
```

Приложение будет доступно по адресу: http://localhost:4000

### Сборка для production

```bash
npm run build
npm run start
```

## API Integration

Фронтенд подключается к следующим микросервисам:

- **Auth Service** (3001): Аутентификация и управление пользователями
- **Content Service** (3002): Управление контентом и комментариями
- **Subscription Service** (3003): Подписки и платежи
- **Admin Service** (3100): Внутренние функции (задачи, чат, аналитика)

## Разработка

### Добавление новых UI компонентов

UI компоненты следуют структуре shadcn/ui. Добавляйте новые компоненты в `src/components/ui/`.

### Создание новых страниц

Используйте App Router Next.js. Создавайте новые маршруты в `src/app/`.

### State Management

Для глобального состояния используйте Zustand:

```typescript
// src/store/useAuthStore.ts
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
```

### Data Fetching

Используйте React Query для загрузки данных:

```typescript
import { useQuery } from '@tanstack/react-query';

function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(res => res.json()),
  });
}
```

## Производительность

- Используйте `next/image` для оптимизации изображений
- Применяйте `React.lazy()` для code-splitting
- Кешируйте данные с помощью React Query
- Минимизируйте bundle size

## Безопасность

- JWT токены для аутентификации
- HTTPS в production
- CSRF защита
- XSS protection
- Rate limiting

## Поддержка

Для вопросов и предложений:
- GitHub Issues: [приватный репозиторий]
- Email: abdulazizov@codecrafters.uz
- Jira: https://codecraftersuz.atlassian.net

---

**Разработано CodeCrafters UZ для METRODA** 🚀
