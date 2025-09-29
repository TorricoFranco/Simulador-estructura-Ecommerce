export const ordersHandlers = {
  "order.completed": (event) => {
    console.log(`✉️ Enviando confirmación al cliente ${event.clientId} para la orden ${event.id}`)
    // TODO: enviar email de confirmación
  },

  "order.failed": (event) => {
    console.log(`✉️ Avisando a cliente ${event.clientId} que la orden ${event.id} falló`)
    // TODO: enviar email de reintento/fallo
  },
}