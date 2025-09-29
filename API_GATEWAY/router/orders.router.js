import { Router } from "express"
import { OrdersController } from "../controller/orders.controller.js"

export const ordersRouter = () => {
    const ordersRouter = Router()
    const orderController = new OrdersController()

    ordersRouter.get('/client/:clientId', orderController.getOrdersByClient)
    ordersRouter.get('/:orderId', orderController.getOrder)
    ordersRouter.post('/create', orderController.createOrder)

    return ordersRouter
}

// - `POST /orders` → crear orden (checkout).
// - `GET /orders/:id` → ver detalles de una orden.


// EJEMPLO ESTRUCTURA DE ORDEN

// {
//   "id": 12345,s
//   "userId": 87,
//   "items": [
//     { "productId": 1, "name": "Zapatillas", "qty": 2, "price": 45000 },
//     { "productId": 2, "name": "Remera", "qty": 1, "price": 12000 }
//   ],
//   "subtotal": 102000,
//   "shippingCost": 5000,
//   "total": 107000,
//   "currency": "ARS",
//   "paymentMethod": "credit_card",
//   "status": "pending",  
//   "shippingAddress": {
//     "street": "Av. Siempre Viva",
//     "number": 742,
//     "city": "Springfield",
//     "country": "AR"
//   },
//   "createdAt": "2025-08-30T12:30:00Z",
//   "updatedAt": "2025-08-30T12:30:00Z"
// }
