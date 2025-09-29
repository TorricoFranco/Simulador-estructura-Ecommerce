import { Router } from "express"
import { AuthController } from "../controller/auth.controller.js"

export const authRouter = (app) => {
  const router = Router()
  const authController = new AuthController()

  // prefijo /auth
  app.use("/", router)

  // rutas
  router.post("/login", authController.login)
  router.post("/register", authController.register)
  router.post("/refresh", authController.refresh)
  router.post("/logout", authController.logout)

  return router
}