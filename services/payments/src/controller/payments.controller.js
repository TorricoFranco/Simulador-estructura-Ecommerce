import axios from 'axios'
import { publishPaymentsSucceeded, 
        publishPaymentsFailed 
} from '../rabbitmq/publisher.js'

const ORDERS_SERVICE = "http://orders:3005"


export class PaymentsController {
    
  createPayment = async (req, res) => {
    const { orderId, method } = req.body
    // Obtener monto total llamando a order/:orderId
    const amount = 1000
    console.log(`💳 Procesando pago para orden ${orderId}, monto: ${amount}`)

    try {
      // Simulación de éxito/fallo aleatorio
      const success = Math.random() > 0.6 // 60% éxito
      const status = success ? "paid" : "failed"

      // 1. Actualizar orden vía HTTP
      const response = await axios.patch(`${ORDERS_SERVICE}/${orderId}/status`, { status })
        
      const order = response.data

      if (order.status == "paid") publishPaymentsSucceeded(order)
      else if (order.status == "failed") publishPaymentsFailed(order)
    
      return res.status(200).json({ orderId, status })

    } catch (error) {
      console.error("❌ Error en Payments:", error.message)
      return res.status(500).json({ message: "Error procesando pago" })
    }
  }
}