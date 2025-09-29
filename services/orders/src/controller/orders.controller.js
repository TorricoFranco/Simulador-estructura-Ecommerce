import axios from 'axios'

import { publishOrderCompleted,
         publishOrderFailed,
         publishOrderPaid,
         publishOrderPaymentsFailed
 } from '../rabbitmq/publisher.js' 


const SERVICE_PRODUCTS = "http://products:3006"

export class OrdersController {

  getOrdersClientId = async (req, res) => {
        const { clientId} = req.params
        console.log("Ver las ordenes del cliente: ", clientId)
        return res.json({message: "createOrder"})
    }

  getOrder = async (req, res) => {
        const { orderId} = req.params
        console.log("Ver orden en detalle", orderId)
        return res.json({message: "getOrder"})
    }

  createOrder = async (req, res) => {
    try {
        const cart = req.body  // { clientId, items }

        // 1. Reservar stock y obtener precios
        const response = await axios.post(`${SERVICE_PRODUCTS}/products/reserve`, cart.items)

        if (response.data.status !== "OK") {
            return res.status(400).json({ message: "No se pudo reservar el stock" })
        }

        const { reserved, mount } = response.data

        // 2. Crear la orden
        const order = {
            id: Date.now().toString(),
            clientId: cart.clientId,
            items: reserved,
            mount,
            status: "pending_payment"
        }

        console.log("📝 Orden creada:", order)

        return res.status(201).json(order)
    } catch (error) {
        console.error("❌ Error en createOrder:", error.message)
        return res.status(500).json({ message: "Error al crear la orden" })
    }
  }


updateOrderStatus = async (req, res) => {
    try {
      const { orderId } = req.params
      const { status } = req.body

      // obtener la orden en la db
      const order = {
        id: orderId,
        clientId: "Pablito123",
        items: [
          { productId: "123", name: "Iphone35 core plus", quantity: 1, price: 3500 }
        ],
        total: 3500,
        status: "pending_payment"
      }

      console.log(`🔄 Actualizando orden ${orderId} → status solicitado: ${status}`)

      // Actualizamos el estado del pago que viene de Payments
      if (status === "paid") {
        order.status = "paid"
        publishOrderPaid(order)

        // Simulación de chequeo de stock
        const stockOk = Math.random() > 0.6 // 60% éxito

        if (stockOk) {
          order.status = "completed"
          publishOrderCompleted(order)
          console.log("✅ Orden completada: stock disponible")
        } else {
          order.status = "failed"
          publishOrderFailed(order)
          // Publicar evento payment.refunded
          // publishPaymentRefunded(order)
          console.log("⚠️ Orden fallida: stock insuficiente, pago devuelto")
        }

      } else if (status === "failed") {
        order.status = "failed"
        publishOrderPaymentsFailed(order)
        console.log("❌ Pago fallido, orden marcada como failed")
      }

      return res.status(200).json(order)

    } catch (error) {
      console.error("❌ Error en updateOrderStatus:", error.message)
      return res.status(500).json({ message: "Error al actualizar estado de la orden" })
    } 
  }
}