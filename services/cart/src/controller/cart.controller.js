import axios from 'axios'

export class CartController {

  addToCart = async (req, res) => {
    // Comprobar si el producto tiene stock
    const statusProduct = await 
    console.log("🛒 Agregar producto al carrito:", req.body)
    res.status(201).json({ message: "Producto agregado al carrito" })
  }

  getCart = async (req, res) => {
    console.log("🛒 Obtener carrito")
    res.status(200).json({ message: "Carrito actual" })
  }

  deleteFromCart = async (req, res) => {
    const { itemId } = req.params
    console.log(`🛒 Eliminar producto con ID ${itemId} del carrito`)
    res.status(200).json({ message: `Producto ${itemId} eliminado del carrito` })
  }
}
