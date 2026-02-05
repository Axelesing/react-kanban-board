# Kanban Board

Интерактивное frontend‑приложение в формате Kanban‑доски на React + TypeScript.  
Позволяет управлять задачами, перемещать их между колонками и настраивать внешний вид.

Проект демонстрирует FSD‑архитектуру, Effector‑состояние, drag‑and‑drop и виртуализацию списков.

## Основные возможности
- Создание задач и быстрый старт с дефолтными карточками.
- Редактирование и удаление задач в модальном окне.
- Drag & Drop между колонками (мышь и touch).
- Фильтры и поиск по названию/описанию, фильтрация по статусу и исполнителю.
- Отображение статуса, исполнителя и даты в карточке.
- Виртуализация длинных списков и ленивое подключение модального окна.
- Настройки темы: светлая/темная/авто, выбор темы, сохранение в localStorage.
- Сохранение состояния доски в localStorage и уведомления об ошибках.
- Адаптивная верстка и базовая доступность (ARIA, ScreenReaderOnly).

## Стек технологий
- React 19
- TypeScript
- Vite
- Effector, effector-react, patronum
- React Router
- @dnd-kit
- @tanstack/react-virtual
- MUI, Emotion, styled-components
- date-fns
- Jest, React Testing Library

## Структура проекта
```text
src/
  app/               # инициализация приложения, layout, провайдеры
  pages/             # страницы (Board, About, Theme settings)
  widgets/           # крупные UI-блоки (модалка задачи)
  features/          # бизнес-фичи (kanban, taskModal)
  shared/            # переиспользуемые UI/хуки/модели/константы
  assets/            # статические ресурсы
```

## Архитектура
Проект построен по Feature-Sliced Design: слои `app`, `pages`, `widgets`, `features`, `shared`.  
Состояние и эффекты реализованы на Effector, UI — на MUI с темизацией через CSS‑переменные.  
Данные доски и настройки темы сохраняются в localStorage.

## Маршруты
- `/` — основная доска
- `/about` — описание проекта
- `/theme` — настройки темы

## Запуск проекта
1. `npm install`
2. `npm run dev` — dev‑сервер на `http://localhost:8080`
3. `npm run build` — production‑сборка в `build/`
4. `npm run preview` — локальный просмотр сборки
5. `npm run lint`
6. `npm test`

## Лицензия
MIT, см. `LICENSE`.
