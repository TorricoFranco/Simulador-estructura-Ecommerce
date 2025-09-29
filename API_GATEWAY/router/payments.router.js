import { Router } from "express"
import { PaymentsController } from "../controller/payments.controller.js"

export const paymentsRouter = () => {
    const paymentsRouter = Router()
    const paymentController = new PaymentsController()

    paymentsRouter.post('/', paymentController.createPayment)

    return paymentsRouter
}

// - `POST /payments` → iniciar pago (ej. con Stripe).
// - `GET /payments/:id` → estado del pago.