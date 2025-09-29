import axios from "axios"
const PRODUCTS_SERVICE = "http://products:3006" 

export class ProductsController {

    getListProduct = async (req, res) => {
        try {
            const response = await axios.get(`${PRODUCTS_SERVICE}/products`)
            res.json(response.data)
        } catch (error) {
            console.error("❌ Error al obtener productos:", error.message)
            res.status(500).json({ error: "Error al obtener productos" })
        }
    }

    getProductId = async (req, res) => {
        try {
            const { id } = req.params
            const response = await axios.get(`${PRODUCTS_SERVICE}/products/${id}`)
            res.json(response.data)
        } catch (error) {
            console.error("❌ Error al obtener producto:", error.message)
            res.status(500).json({ error: "Error al obtener producto" })
        }
    }
}


// - `GET /products` → listar productos.
// - `GET /products/:id` → ver producto.

