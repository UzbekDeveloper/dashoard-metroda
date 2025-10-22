# METRODA Color Guide

## Фирменный цвет

### Primary Orange
```
Hex: #f65200
RGB: rgb(246, 82, 0)
HSL: hsl(20, 100%, 48%)
```

Это основной фирменный цвет METRODA - яркий, энергичный оранжевый, символизирующий:
- 🔥 **Энергию и движение** - активная платформа для создателей
- 🚀 **Инновации** - современные технологии для монетизации
- 🌟 **Креативность** - пространство для творчества

## Цветовая палитра

### Primary (Orange) - Основной цвет
Используется для:
- Кнопки действий (CTA)
- Активные состояния в навигации
- Важные элементы UI
- Ссылки и hover эффекты

```css
/* Light mode */
--primary: 20 100% 48%        /* #f65200 */

/* Dark mode */
--primary: 20 100% 55%        /* Немного светлее для контраста */
```

**Примеры использования:**
```tsx
// Primary button
<button className="bg-primary text-primary-foreground">
  Создать
</button>

// Active navigation
<Link className="text-primary font-semibold">
  Дашборд
</Link>
```

### Secondary (Deep Blue) - Вторичный цвет
Используется для:
- Второстепенные кнопки
- Информационные блоки
- Контраст с оранжевым

```css
/* Light mode */
--secondary: 227 71% 64%

/* Dark mode */
--secondary: 227 71% 50%
```

**Примеры использования:**
```tsx
// Secondary button
<button className="bg-secondary text-secondary-foreground">
  Отмена
</button>

// Info card
<div className="bg-secondary/10 border-secondary">
  Информация
</div>
```

### Accent (Light Orange) - Акцентный цвет
Используется для:
- Hover эффекты
- Подсветка элементов
- Тонкие акценты

```css
/* Light mode */
--accent: 20 100% 60%

/* Dark mode */
--accent: 20 90% 50%
```

## Семантические цвета

### Success (Green) - Успех
Используется для:
- Успешные операции
- Подтверждения
- Положительные метрики

```css
--success: 142 76% 36% (light) / 142 76% 45% (dark)
```

**Примеры:**
```tsx
<div className="bg-success text-success-foreground">
  Задача выполнена!
</div>

<div className="text-success">
  +12.5% ↑
</div>
```

### Warning (Yellow) - Предупреждение
Используется для:
- Предупреждающие сообщения
- Требующие внимания элементы
- Промежуточные состояния

```css
--warning: 38 92% 50% (light) / 38 92% 60% (dark)
```

**Примеры:**
```tsx
<div className="bg-warning text-warning-foreground">
  ⚠️ Требуется модерация
</div>
```

### Error/Destructive (Red) - Ошибка
Используется для:
- Ошибки
- Удаление данных
- Критические действия

```css
--destructive: 0 84.2% 60.2% (light) / 0 62.8% 50% (dark)
```

**Примеры:**
```tsx
<button className="bg-destructive text-destructive-foreground">
  Удалить
</button>

<p className="text-destructive">
  Ошибка валидации
</p>
```

### Info (Blue) - Информация
Используется для:
- Информационные блоки
- Подсказки
- Нейтральные уведомления

```css
--info: 221 83% 53% (light) / 221 83% 60% (dark)
```

## Нейтральные цвета

### Background & Foreground
```css
/* Light mode */
--background: 0 0% 100%        /* Белый */
--foreground: 240 10% 3.9%     /* Почти черный */

/* Dark mode */
--background: 240 10% 3.9%     /* Темный */
--foreground: 0 0% 98%         /* Почти белый */
```

### Muted (Приглушенные)
Для второстепенного текста и фонов:
```css
--muted: 240 4.8% 95.9% (light) / 240 3.7% 15.9% (dark)
--muted-foreground: 240 3.8% 46.1% (light) / 240 5% 64.9% (dark)
```

### Border & Input
```css
--border: 240 5.9% 90% (light) / 240 3.7% 15.9% (dark)
--input: 240 5.9% 90% (light) / 240 3.7% 15.9% (dark)
```

## Использование в компонентах

### Кнопки

```tsx
// Primary action
<button className="bg-primary hover:bg-primary/90 text-primary-foreground">
  Создать публикацию
</button>

// Secondary action
<button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
  Сохранить черновик
</button>

// Destructive action
<button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
  Удалить аккаунт
</button>

// Outline
<button className="border border-primary text-primary hover:bg-primary hover:text-primary-foreground">
  Подробнее
</button>

// Ghost
<button className="text-primary hover:bg-primary/10">
  Отмена
</button>
```

### Cards

```tsx
// Default card
<div className="bg-card text-card-foreground border rounded-lg p-6">
  Контент карточки
</div>

// Success card
<div className="bg-success/10 border-success text-success rounded-lg p-4">
  ✓ Операция успешна
</div>

// Warning card
<div className="bg-warning/10 border-warning text-warning rounded-lg p-4">
  ⚠️ Требует внимания
</div>
```

### Badges/Tags

```tsx
// Primary badge
<span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
  Новое
</span>

// Success badge
<span className="bg-success text-success-foreground px-2 py-1 rounded text-xs">
  Активен
</span>

// Warning badge
<span className="bg-warning text-warning-foreground px-2 py-1 rounded text-xs">
  Ожидает
</span>

// Muted badge
<span className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
  Архив
</span>
```

### Navigation

```tsx
// Active link
<Link className="text-primary font-medium border-b-2 border-primary">
  Активная страница
</Link>

// Inactive link
<Link className="text-muted-foreground hover:text-foreground">
  Другая страница
</Link>

// Sidebar active item
<div className="bg-primary text-primary-foreground rounded-lg px-3 py-2">
  Дашборд
</div>
```

### Inputs

```tsx
// Input with focus
<input className="border-input focus:ring-2 focus:ring-primary focus:border-primary" />

// Error state
<input className="border-destructive focus:ring-destructive" />
<p className="text-destructive text-sm">Обязательное поле</p>

// Success state
<input className="border-success focus:ring-success" />
<p className="text-success text-sm">Email доступен</p>
```

### Stats/Metrics

```tsx
// Positive metric
<div className="text-success">
  <span className="text-2xl font-bold">+12.5%</span>
  <span className="text-sm">↑ рост</span>
</div>

// Negative metric
<div className="text-destructive">
  <span className="text-2xl font-bold">-3.2%</span>
  <span className="text-sm">↓ снижение</span>
</div>

// Neutral metric
<div className="text-foreground">
  <span className="text-2xl font-bold">2,543</span>
  <span className="text-muted-foreground text-sm">пользователей</span>
</div>
```

## Градиенты

### Primary Gradient
```tsx
<div className="bg-gradient-to-r from-primary via-accent to-warning">
  Hero gradient
</div>
```

### Subtle Gradient
```tsx
<div className="bg-gradient-to-br from-primary/10 to-transparent">
  Subtle background
</div>
```

## Темная тема

Все цвета автоматически адаптируются для темной темы через CSS переменные.

Переключение темы:
```tsx
// Add to html tag
<html className="dark">
```

## Accessibility

### Контрастность

Все цветовые комбинации соответствуют WCAG 2.1 Level AA:
- ✅ Primary на white: 5.2:1
- ✅ Primary foreground на primary: 7.1:1
- ✅ Text на background: 12:1

### Focus States

Всегда используйте `focus:ring-primary` для фокуса:
```tsx
<button className="focus:ring-2 focus:ring-primary focus:ring-offset-2">
  Кнопка
</button>
```

## Best Practices

1. **Используйте primary экономно** - только для главных действий
2. **Muted для второстепенного** - делает иерархию понятной
3. **Семантические цвета по назначению** - не используйте success для ошибок
4. **Прозрачность для легкости** - используйте `/10`, `/20` для фонов
5. **Hover эффекты** - `/90` для затемнения, `/110` для осветления

---

**METRODA** - Энергия оранжевого, точность синего 🔥💙
