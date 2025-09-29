const SHIPPING_SERVICE = "http://shipping:3007"
import axios from "axios"

export class ShippingController {

  getShippingById = async (req, res) => {
    try {
      const { id } = req.params
      // Llamada al servicio Shipping real
      const response = await axios.get(`${SHIPPING_SERVICE}/${id}`)
      return res.status(response.status).json(response.data)
    } catch (error) {
      console.error("❌ Error consultando envío por ID:", error.message)
      return res.status(500).json({ message: "Error consultando envío" })
    }
  }

  getAllShippings = async (req, res) => {
    try {
      const { clientId } = req.params
      const response = await axios.get(`${SHIPPING_SERVICE}/${clientId}`)
      return res.status(response.status).json(response.data)
    } catch (error) {
      console.error("❌ Error consultando todos los envíos:", error.message)
      return res.status(500).json({ message: "Error consultando envíos" })
    }
  }
}
