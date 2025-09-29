import axios from "axios"
const PAYMENTS_SERVICE = "http://payments:3009"

export class PaymentsController {
    
  createPayment = async (req, res) => {
    try {
        const { orderId, method } = req.body
        
        // Llamada al servicio Payments
        const response = await axios.post(`${PAYMENTS_SERVICE}`, {
            orderId,
            method
        })

        return res.status(response.status).json(response.data)
    } catch (error) {
        console.error("❌ Error al llamar a Payments:", error.message)
        return res.status(500).json({ message: "Error procesando el pago" })
    }
  }
}
// - `POST /payments` → iniciar pago (ej. con Stripe).