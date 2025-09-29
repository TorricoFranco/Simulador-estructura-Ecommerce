import { Router } from "express"
import { ProductsController } from "../controller/products.controller.js"

export const productsRouter = () => {
    const productsRouter = Router()
    const productController = new ProductsController()

    productsRouter.get('/', productController.getListProduct)
    productsRouter.get('/:id', productController.getProductId)

    return productsRouter
}

// - `GET /products` → listar productos.
// - `GET /products/:id` → ver producto.
