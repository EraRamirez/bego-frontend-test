export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  'https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io'

export const DEFAULT_AVATAR = '/default-avatar.svg'

export const ORDERS_TABS = ['Próximos', 'Completados', 'Pasados'] as const

export const DESTINATION_TABS = ['pickup', 'dropoff'] as const
