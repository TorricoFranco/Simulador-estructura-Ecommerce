import { publishCreateShipping, publishShippingUpdateStatus } from "../rabbitmq/publisher.js"

export class ShippingController {

  createShipping = async (req, res) => {
    try {
      const { orderId, clientId, address } = req.body

      // Validación rápida

      const newShipping = {
        id: 231331120,
        orderId,
        clientId,
        address,
        status: "pending",          
        createdAt: new Date()
      }

      // Guardr newShipping en la bd

      console.log(`✅ Envío creado para orden ${orderId}`)

      // TODO: publicar evento shipping.created o shipping.updated
      publishCreateShipping(newShipping)

      return res.status(201).json(newShipping)
    } catch (error) {
      console.error("❌ Error creando envío:", error.message)
      return res.status(500).json({ message: "Error creando envío" })
    }
  }

  getShippingById = async (req, res) => {
    try {
      const { id } = req.params

      // Simulación: buscar en una "DB"
      const shipping = {
        id,
        orderId: "abc123",
        clientId: "Pablito123",
        status: "in_transit", // pending, in_transit, delivered, canceled
        address: "Calle Falsa 123",
        estimatedDelivery: "2025-10-05"
      }

      // TODO: Buscar en la DB real → SELECT * FROM shippings WHERE id = ?
      return res.json(shipping)
    } catch (error) {
      console.error("❌ Error consultando envío por ID:", error.message)
      return res.status(500).json({ message: "Error consultando envío" })
    }
  }

  getAllShippingsClientId = async (req, res) => {
    try {
        const { clientId } = req.params
        
        // 🔎 Simulación: lista de envíos del cliente/usuario
      const shippings = [
        {
          id: "ship_1",
          orderId: "abc123",
          clientId: "Pablito123",
          status: "pending",
          address: "Calle Falsa 123",
          estimatedDelivery: "2025-10-05",
          clientId
        },
        {
          id: "ship_2",
          orderId: "def456",
          clientId: "Juanito321",
          status: "delivered",
          address: "Av. Siempre Viva 742",
          estimatedDelivery: "2025-09-25",
          clientId
        }
      ]

      return res.json(shippings)
    } catch (error) {
      console.error("❌ Error consultando todos los envíos:", error.message)
      return res.status(500).json({ message: "Error consultando envíos" })
    }
  }

  updateShippingStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    // 🔎 Simulación: buscar envío en DB
    const shipping = {
      id,
      orderId: "abc123",
      tracking_number: 230928130928390,
      clientId: "Pablito123",
      status: "pending",
      address: "Calle Falsa 123",
      estimatedDelivery: "2025-10-05"
    }

    shipping.status = status

    // TODO: guardar cambio en DB
    console.log(`📦 Envío ${id} actualizado a: ${status}`)

    // Publicar evento shipping.updated
    publishShippingUpdateStatus(shipping)
    return res.json(shipping)
    
  } catch (error) {
    console.error("❌ Error actualizando envío:", error.message)
    return res.status(500).json({ message: "Error actualizando envío" })
  }
}
}
