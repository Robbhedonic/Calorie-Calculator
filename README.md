# Calorie Calculator (React Native + Expo)

A simple calorie calculator app built with React Native and Expo.

## Requirements

- Node.js 18+
- npm
- Expo Go app (optional, for physical device testing)

## Install

```bash
npm install
```

## Run

```bash
npm start
```

Then open with:

- `a` for Android emulator
- `i` for iOS simulator (macOS)
- `w` for web
- or scan the QR code with Expo Go

## Scripts

- `npm start` - start Expo dev server
- `npm run android` - open Android
- `npm run ios` - open iOS
- `npm run web` - open web
- `npm run lint` - run ESLint
- `npm run format` - format with Prettier
- `npm run format:check` - check Prettier formatting

## Build para producción (Vercel)

1. Ejecuta:

   ```bash
   npm run build
   ```

   Esto generará la carpeta `dist/` lista para producción.

2. En Vercel:
   - Elige como directorio de salida: `dist`
   - Comando de build: `npm run build`
   - Framework: Otros (Other)

3. Vercel detectará automáticamente el proyecto y desplegará el contenido de `dist/`.

---

## Notas

- No necesitas el campo `homepage` ni scripts de GitHub Pages.
- Puedes eliminar la dependencia `gh-pages`.
