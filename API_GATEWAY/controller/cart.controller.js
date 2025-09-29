import axios from "axios"
const CART_SERVICE = "http://cart:3003" 

export class CartController {
  getCart = async (req, res) => {
    try {
      const response = await axios.get(`${CART_SERVICE}/cart`)
      return res.status(response.status).json(response.data)
    } catch (error) {
      console.error("❌ Error en getCart:", error.message)
      return res.status(500).json({ message: "Error al obtener carrito" })
    }
  }

  updateCart = async (req, res) => {
    try {
      const response = await axios.post(`${CART_SERVICE}/cart`, req.body)
      return res.status(response.status).json(response.data)
    } catch (error) {
      console.error("❌ Error en updateCart:", error.message)
      return res.status(500).json({ message: "Error al actualizar carrito" })
    }
  }

  deleteCart = async (req, res) => {
    const { itemId } = req.params
    try {
      const response = await axios.delete(`${CART_SERVICE}/cart/${itemId}`)
      return res.status(response.status).json(response.data)
    } catch (error) {
      console.error("❌ Error en deleteCart:", error.message)
      return res.status(500).json({ message: "Error al eliminar producto del carrito" })
    }
  }
}
