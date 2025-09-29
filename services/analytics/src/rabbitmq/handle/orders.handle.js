export const ordersHandlers = {
  "order.paid": (event) => {
    console.log(`📊 Analytics: Pago confirmado para orden ${event.orderId}, cliente ${event.clientId}, total $${event.total}`)
    // TODO: guardar en base de datos de analytics
  },

  "order.paymentFailed": (event) => {    
    console.log(`📊 Analytics: Pago fallido para orden ${event.orderId}, cliente ${event.clientId}`)
    // TODO: registrar intento fallido
  },

  "order.completed": (event) => {
    console.log(`📊 Analytics: Orden completada ${event.orderId}`)
    // TODO: registrar venta finalizada
  },

  "order.failed": (event) => {
    console.log(`📊 Analytics: Orden fallida ${event.orderId}`)
    // TODO: registrar fallo (ej. stock)
  },
}

