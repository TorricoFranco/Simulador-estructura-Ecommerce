import axios from "axios"

const ORDERS_SERVICE = "http://orders:3005"

export class OrdersController {

  getOrdersByClient = async (req, res) => {
    try {
      const { clientId } = req.params
      const response = await axios.get(`${ORDERS_SERVICE}/client/${clientId}`)

      return res.status(response.status).json(response.data)
    } catch (error) {
      console.error("❌ Error al obtener órdenes del cliente:", error.message)
      return res.status(500).json({ message: "Error en API Gateway /orders" })
    }
  }

  getOrder = async (req, res) => {
    try {
      console.log("📩 Request recibido en API Gateway /orders/:idOrder")

      const { orderId } = req.params
      const response = await axios.get(`${ORDERS_SERVICE}/${orderId}`)

      return res.status(response.status).json(response.data)
    } catch (error) {
      console.error("❌ Error al llamar a Orders Service (getOrder):", error.message)
      return res.status(500).json({ message: "Error en API Gateway /orders/:id" })
    }
  }

  createOrder = async (req, res) => {
    try {
      console.log("📩 Request recibido en API Gateway /orders/create")
      const response = await axios.post(`${ORDERS_SERVICE}/create`, req.body)

      return res.status(response.status).json(response.data)
    } catch (error) {
      console.error("❌ Error al llamar a Orders Service (createOrder):", error.message)
      return res.status(500).json({ message: "Error en API Gateway /orders/create" })
    }
  }
}
