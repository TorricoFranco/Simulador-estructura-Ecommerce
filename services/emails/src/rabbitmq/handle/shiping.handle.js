export const shippingHandlers = {
  "shipping.create": (event) => {
    console.log("Tu pedido ya esta en camino hacia: ", event.address, "poder rastrearlo por mediodel número de seguimiento: ", event.tracking_number)
    // TODO: enviar email de aviso 
  },

  "shipping.update": (event) => {
    console.log(`Actualización de tu envio a ${event.status}`)
    // TODO: enviar email de aviso de actualización del envio
  },
}