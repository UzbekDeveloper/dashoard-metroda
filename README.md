# METRODA Admin Dashboard

Полнофункциональная административная панель для управления платформой METRODA - локальной системой монетизации контента в Узбекистане.

## О проекте

METRODA - это современная медиа-платформа для монетизации контента в Узбекистане, решающая ключевые проблемы локального рынка:

- 🔒 Защита от блокировок - локальный хостинг и инфраструктура
- 💳 Локальные платежи - интеграция с Payme, Click, Uzum
- 📊 Выгодные условия - 70% дохода авторам, 30% платформе
- 🎨 Гибкость форматов - текст, видео, аудио, изображения

## Структура монорепозитория

```
dashoard-metroda/
├── apps/
│   ├── frontend/          # Next.js Admin Panel
│   └── backend/           # NestJS Backend для внутренних функций
├── shared/                # Общие типы и утилиты
└── README.md
```

## Технологический стек

### Frontend
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- TanStack Query + Zustand
- Socket.io Client для real-time

### Backend (планируется)
- NestJS + TypeScript
- PostgreSQL + TypeORM
- Socket.io для WebSocket
- Bull для очередей

## Основные функции

### ✅ Реализовано

1. **Главный дашборд**
   - Статистика платформы в реальном времени
   - Ключевые метрики (пользователи, авторы, доходы)
   - Последняя активность
   - Быстрые действия

2. **Layout и навигация**
   - Адаптивная sidebar с иконками
   - Header с поиском и уведомлениями
   - Маршрутизация между модулями

3. **UI Kit (shadcn/ui)**
   - Button, Card, Input компоненты
   - Темизация (light/dark mode готов)
   - Кастомные утилиты

### 🚧 В разработке

- Управление пользователями
- Модерация контента
- Финансовая аналитика
- Kanban доска для задач
- Система чата
- Backend API

## Быстрый старт

### Требования

- Node.js 18+
- npm или yarn

### Установка

```bash
# Клонируем репозиторий
git clone <repository-url>
cd dashoard-metroda

# Устанавливаем зависимости frontend
cd apps/frontend
npm install

# Копируем .env файл
cp .env.local.example .env.local

# Запускаем dev сервер
npm run dev
```

Приложение будет доступно по адресу: http://localhost:4000

### Настройка переменных окружения

Отредактируйте `apps/frontend/.env.local`:

```env
# API URLs микросервисов METRODA
AUTH_SERVICE_URL=http://localhost:3001
CONTENT_SERVICE_URL=http://localhost:3002
SUBSCRIPTION_SERVICE_URL=http://localhost:3003
ADMIN_SERVICE_URL=http://localhost:3100

# Публичные переменные
NEXT_PUBLIC_APP_NAME=METRODA Admin
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_WS_URL=ws://localhost:3100
```

## Разработка

### Frontend

```bash
cd apps/frontend
npm run dev          # Запуск dev сервера
npm run build        # Production build
npm run lint         # Линтинг кода
npm run type-check   # Проверка типов
```

### Backend (когда будет готов)

```bash
cd apps/backend
npm run start:dev    # Запуск dev сервера
npm run build        # Production build
npm run test         # Запуск тестов
```

## Roadmap

### Фаза 1: Базовая инфраструктура ✅
- [x] Инициализация Next.js проекта
- [x] Настройка Tailwind CSS и shadcn/ui
- [x] Создание базового layout
- [x] Главный дашборд с метриками

### Фаза 2: Основные модули 🚧
- [ ] Управление пользователями
- [ ] Модерация контента
- [ ] Финансовая аналитика
- [ ] Система настроек

### Фаза 3: Расширенные функции 📅
- [ ] Kanban доска (как Jira)
- [ ] Система чата
- [ ] Real-time уведомления
- [ ] Отчеты и экспорт данных

### Фаза 4: Backend API 📅
- [ ] NestJS сервер
- [ ] API endpoints для внутренних функций
- [ ] WebSocket для real-time
- [ ] База данных и миграции

### Фаза 5: Production Ready 📅
- [ ] Аутентификация и авторизация
- [ ] Rate limiting и безопасность
- [ ] Docker compose setup
- [ ] CI/CD pipeline
- [ ] Мониторинг и логирование

## Интеграция с METRODA

Эта админ-панель интегрируется с основными микросервисами METRODA:

- **Auth Service (3001)**: JWT аутентификация, RBAC
- **Content Service (3002)**: Посты, комментарии, реакции
- **Subscription Service (3003)**: Подписки, планы, доступ

## Архитектура

```
┌─────────────────────────────────────────┐
│       METRODA Admin Dashboard           │
│         (Next.js Frontend)              │
│              Port 4000                  │
└─────────────┬───────────────────────────┘
              │
              │ HTTP/WebSocket
              │
┌─────────────▼───────────────────────────┐
│         Admin Backend API               │
│          (NestJS Server)                │
│              Port 3100                  │
└─────────────┬───────────────────────────┘
              │
    ┌─────────┼─────────┐
    │         │         │
    ▼         ▼         ▼
┌───────┐ ┌──────┐ ┌─────────┐
│ Auth  │ │Content│ │Subscription│
│Service│ │Service│ │Service    │
│ 3001  │ │ 3002 │ │   3003    │
└───────┘ └──────┘ └─────────┘
```

## Команда

**CodeCrafters UZ**
- Разработка: Abdulaziz Abdulazizov
- Email: abdulazizov@codecrafters.uz
- Jira: https://codecraftersuz.atlassian.net

## Лицензия

Private - Все права защищены © 2024 METRODA

---

🚀 **METRODA - Создаем экосистему для контент-создателей Узбекистана**
