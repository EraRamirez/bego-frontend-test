# BeGo — Prueba técnica Frontend

Implementación de las pantallas **Pedidos de carga** y **Detalle de carga** para la prueba técnica de Frontend en BeGo.

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

### Pedidos de carga
- Listado de órdenes desde la API
- Búsqueda por número de orden
- Cuenta regresiva con `start_date`; al terminar habilita el botón y registra `Navegar` en consola
- Navegación a detalle con el botón **Continuar**

### Detalle de carga
- Selector **Recogida / Entrega** con datos de `destinations`
- Línea de tiempo con checks según `status_list`
- Botón **Rastrear pedido** activo solo si `status >= 3`
- Panel **Datos de recogida** expandible (acordeón)
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
