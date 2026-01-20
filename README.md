# Infotecs

React приложение на TypeScript с использованием Webpack для сборки.

## Требования

- Node.js >= 16
- npm >= 7

## Установка

```bash
npm install
```

## Запуск

### Режим разработки

```bash
npm start
```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000)

### Сборка для production

```bash
npm run build
```

Собранные файлы будут находиться в директории `dist/`

### Предпросмотр production сборки

```bash
npm run preview
```

## Структура проекта

```
infotecs/
├── src/
│   ├── components/     # React компоненты
│   │   └── app.tsx
│   ├── App.css         # Стили приложения
│   ├── const.ts        # Константы
│   └── index.tsx       # Точка входа
├── dist/               # Собранные файлы (создаётся после build)
├── index.html          # HTML шаблон
├── webpack.config.js   # Конфигурация Webpack
├── tsconfig.json       # Конфигурация TypeScript
└── package.json        # Зависимости и скрипты
```

## Скрипты

- `npm start` — запуск dev-сервера с hot reload
- `npm run build` — сборка проекта для production
- `npm run preview` — предпросмотр production сборки

## Лицензия

Private
