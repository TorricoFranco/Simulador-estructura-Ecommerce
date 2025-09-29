import { Router } from "express"
import { ShippingController } from "../controller/shipping.controller.js"

export const shippingRouter = () => {
    const shippingRouter = Router()
    const shippingController = new ShippingController()

    
    shippingRouter.get("/:id", shippingController.getShippingById)
    shippingRouter.get("/:clientId", shippingController.getAllShippings)

    return shippingRouter
}

// - `GET /shipping/:orderId` → estado del envío.