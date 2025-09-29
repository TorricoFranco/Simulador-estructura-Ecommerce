import { Router } from "express"
import { PaymentsController } from "../controller/payments.controller.js"

export const paymentsRouter = (app) => {
    const router = Router()
    const paymentController = new PaymentsController()

    app.use(router)

    router.post('/', paymentController.createPayment)
    return router
}

