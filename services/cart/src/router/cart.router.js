import { Router } from "express"
import { CartController } from "../controller/cart.controller.js"

export const cartRouter = (app) => {
  const router = Router()
  const cartController = new CartController()

  // prefijo /auth
  app.use("/", router)

  // rutas
  router.get("/cart", cartController.getCart)
  router.post("/cart", cartController.addToCart)
  router.delete("/cart/:itemId", cartController.deleteFromCart)

  return router
}
