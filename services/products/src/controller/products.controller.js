import { publishProductViewed } from "../rabbitmq/publisher.js"

export class ProductsController {

    getListProduct = async (req, res) => {
      try {
        console.log("products list SERVICIO PRODUCTS")
        res.status(200).json({message: "Hol"})
    } catch (error) {
        console.error("❌ Error al obtener productos:", error.message)
        res.status(500).json({ error: "Error al obtener productos" })
        }
    }

  getProductId = async (req, res) => {
    try {
        console.log("products ID SERVICIO PRODUCTS")
        await publishProductViewed("id")
        res.status(200).json({message: "Hol"})

    } catch (error) {
        console.error("❌ Error al obtener producto:", error.message)
        res.status(500).json({ error: "Error al obtener producto" })
    }
}

  productStockReserve = async (req, res) => {
    try {
      const products = req.body // [{ productId, quantity }]
      let mount = 0

      // Simulación: precios por ID
      // Se deben buscar en la bd
      const priceMap = {
        "p001": 100,
        "p002": 200,
        "p003": 50
      }

      const reserved = products.map(product => {
        const price = priceMap[product.productId] || 0
        const subtotal = price * product.quantity
        mount += subtotal

        console.log(`✅ Reservando ${product.quantity} del producto ${product.productId}`)

        return {
          ...product,
          price,
          subtotal
        }
      })

      return res.status(200).json({
        status: "OK",
        reserved,
        mount
      })
    } catch (error) {
      console.error("❌ Error al reservar el producto:", error.message)
      return res.status(500).json({ status: "ERROR", error: "Error al reservar el producto" })
    }
  }
}