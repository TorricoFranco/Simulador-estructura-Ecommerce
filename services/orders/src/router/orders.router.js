import { Router } from "express"
import { OrdersController } from "../controller/orders.controller.js"

export const ordersRouter = (app) => {
    const router = Router()
    const orderController = new OrdersController()
    
    app.use(router)

    router.patch("/:orderId/status", orderController.updateOrderStatus)
    router.get('/:orderId', orderController.getOrder)
    router.post('/create', orderController.createOrder)
    router.get('/client/:clientId', orderController.getOrdersClientId)
    
    return router
}
