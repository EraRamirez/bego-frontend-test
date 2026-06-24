# BeGo — Prueba técnica Frontend

Implementación de las pantallas **Pedidos de carga** y **Detalle de carga** para la prueba técnica de Frontend en BeGo.

## Enlaces de entrega

| | Enlace |
|---|---|
| **Repositorio** | https://github.com/EraRamirez/bego-frontend-test |
| **Deploy** | https://frontend-test-nine-ashen.vercel.app |

## Stack

- React 19 + TypeScript
- Vite
- React Router
- Tailwind CSS v4
- API REST (fetch)

## Requisitos

- Node.js 18+
- npm

## Instalación

```bash
git clone https://github.com/EraRamirez/bego-frontend-test.git
cd bego-frontend-test
npm install
cp .env.example .env
```

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en el navegador.

## Build de producción

```bash
npm run build
npm run preview
```

## API

| Endpoint | URL |
|----------|-----|
| Pedidos próximos | `GET /orders/upcoming` |
| Detalle de pedido | `GET /orders` |

Base URL: `https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io`

Configurable con la variable de entorno `VITE_API_BASE_URL` (ver `.env.example`).

## Funcionalidades

### Pedidos de carga
- Listado de órdenes desde la API
- Tabs: Próximos, Completados (`status >= 3`), Pasados (`status >= 5`)
- Búsqueda por número de orden
- Cuenta regresiva con `start_date`; al terminar habilita el botón y registra `Navegar - Pedido #XXX` en consola
- Navegación a detalle con el botón **Continuar**

### Detalle de carga
- Selector **Recogida / Entrega** con datos de `destinations`
- Línea de tiempo con checks según `status_list`
- Botón **Rastrear pedido** activo solo si `status >= 3` (log en consola al hacer click)
- Panel **Datos de recogida / entrega** expandible (acordeón)
- Avatar predeterminado si no hay imagen del conductor

## Estructura del proyecto

```
src/
├── components/   # UI reutilizable (cards, timeline, ruta, acordeón…)
├── pages/        # OrdersPage, OrderDetailsPage
├── services/     # Peticiones a la API
├── hooks/        # useCountdown
├── types/        # Tipos TypeScript del dominio
├── utils/        # Filtros, fechas, merge de órdenes
├── constants/    # API, assets, tabs
├── App.tsx
└── main.tsx
```

## Deploy en Vercel

1. Entra a [vercel.com](https://vercel.com) e inicia sesión con GitHub.
2. **Add New → Project** → importa `EraRamirez/bego-frontend-test`.
3. Vercel detecta Vite automáticamente. No cambies el build command:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. *(Opcional)* En **Environment Variables**, añade:
   - `VITE_API_BASE_URL` = `https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io`
5. Click **Deploy**.
6. Cuando termine, copia la URL (ej. `https://bego-frontend-test.vercel.app`) y actualízala en la tabla **Enlaces de entrega** de arriba.

El archivo `vercel.json` incluye rewrites para que React Router funcione al recargar rutas como `/orders/RF41647Q`.

## Autora

Erandi Guadalupe Ramírez Ayala
