# BeGo — Prueba técnica Frontend

Implementación de las pantallas **Cargo Orders** y **Cargo Details** para la prueba técnica de Frontend en BeGo.

## Stack

- React 19 + TypeScript
- Vite
- React Router
- Tailwind CSS
- API REST (fetch)

## Requisitos

- Node.js 18+
- npm

## Instalación

```bash
git clone https://github.com/EraRamirez/bego-frontend-test.git
cd bego-frontend-test
npm install
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

## Funcionalidades

### Cargo Orders
- Listado de órdenes desde la API
- Búsqueda por número de orden
- Countdown con `start_date`; al terminar habilita el botón y registra `Navegar` en consola
- Navegación a detalle con el botón **Resume**

### Cargo Details
- Switch **Pickup / Dropoff** con datos de `destinations`
- Timeline con checks según `status_list`
- Botón **Track Order** activo solo si `status >= 3`
- Panel **Pickup Data** expandible (accordion)
- Avatar predeterminado si no hay imagen

## Estructura del proyecto

```
src/
├── components/
├── pages/
├── services/
├── types/
├── utils/
├── App.tsx
└── main.tsx
```

## Deploy

Desplegado en Vercel: *[ ]*

## Autora

Erandi Guadalupe Ramírez Ayala
