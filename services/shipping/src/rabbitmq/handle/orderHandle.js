import axios from "axios"
const SHIPPING_SERVICES = "http://shipping:3007"

export const ordersHandlers = {
  "order.completed": async (event) => {
    console.log(`📦 Creando envío para orden ${event.id}, cliente ${event.clientId}`)

    try {
      const response = await axios.post(`${SHIPPING_SERVICES}/createShipping`, {
        orderId: event.id,
        clientId: event.clientId,
        // address: event.address || "Dirección desconocida",
        status: "pending" // estado inicial
      })

      console.log("✅ Envío creado:", response.data)
    } catch (err) {
      console.error("❌ Error al crear envío:", err.message)
    }
  },
}
