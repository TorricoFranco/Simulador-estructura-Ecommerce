import { Router } from "express"
import { ShippingController } from "../controller/shipping.controller.js"

export const shippingRouter = (app) => {
    const router = Router()
    const shippingController = new ShippingController()
    
    app.use(router)

    router.get("/:id", shippingController.getShippingById)
    router.get("/:clientId", shippingController.getAllShippingsClientId)
    router.patch("/:id/status", shippingController.updateShippingStatus)
    router.post("/createShipping", shippingController.createShipping)
    return router
}
