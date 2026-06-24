const STATUS_LABELS: Record<string, string> = {
  Accepted: 'Aceptado',
  'On hold': 'En espera',
  Pending: 'Pendiente',
  'In transit': 'En tránsito',
  Delivered: 'Entregado',
  Completed: 'Completado',
  Pickup: 'Recogida',
  Dropoff: 'Entrega',
  Cancelled: 'Cancelado',
  Assigned: 'Asignado',
  'En route': 'En ruta',
  'On the way': 'En camino',
  Arrived: 'Llegó',
  Loading: 'Cargando',
  Unloading: 'Descargando',
}

export function translateStatus(status: string): string {
  return STATUS_LABELS[status] ?? status
}

export function isAcceptedStatus(status: string): boolean {
  const normalized = status.toLowerCase()
  return normalized === 'accepted' || normalized === 'aceptado'
}
