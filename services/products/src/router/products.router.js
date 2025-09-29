import { Router } from "express"
import { ProductsController } from "../controller/products.controller.js"

export const productRouter = (app) => {
  const router = Router()
  const productsController = new ProductsController()

  // prefijo /auth
  app.use("/products", router)

  // rutas
  router.get("/", productsController.getListProduct)
  router.get("/:id", productsController.getProductId)
  router.post("/reserve", productsController.productStockReserve)

  return router
}