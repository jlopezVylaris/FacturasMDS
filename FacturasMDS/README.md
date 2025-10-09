# FacturasMDS

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```powershell
npm install
```

### Compile and Hot-Reload for Development

```powershell
npm run dev
```

### Tailwind CSS

Se añadió soporte para Tailwind. Si no está instalado, ejecuta:

```powershell
npm install -D tailwindcss postcss autoprefixer
npm install
```

Archivos añadidos/importantes:

- `tailwind.config.js` - configuración de Tailwind (incluye colores `primary` y `darkMode: 'class'`).
- `postcss.config.js` - configuración PostCSS con Tailwind y Autoprefixer.
- `src/assets/tailwind.css` - entrada CSS de Tailwind (importada en `src/main.js`).
- `src/views/LoginView.vue` - vista de login con el HTML suministrado.
- `src/views/RegisterView.vue` - vista de registro.
- `src/router/index.js` - actualizado con rutas `/login` y `/register`.

