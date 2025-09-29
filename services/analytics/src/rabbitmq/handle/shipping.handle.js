export const shippingHandlers = {
  "shipping.create": (event) => {
    console.log("Registrando nuevo envío en analytics", event.id)
    // TODO: registrar nuevo envio
  },

  "shipping.update": (event) => {
    console.log(`Registrar actualización del envio ${event.id}`)
    // TODO: registrar actualizaciones de envios, poder filtrar por: en entraga, en camino, entregado, etc
  },
}