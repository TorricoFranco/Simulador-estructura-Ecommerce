import { Router } from "express"
import { authRouter } from "./auth.router.js"
import { accountsRouter } from "./accounts.router.js"
import { cartRouter } from "./cart.router.js"
import { ordersRouter } from "./orders.router.js"
import { paymentsRouter } from "./payments.router.js"
import { shippingRouter } from "./shipping.router.js"
import { productsRouter } from "./products.router.js"

export const routerIndex = (app) => {
    const routerIndex = Router()

    app.use('/', routerIndex)

    routerIndex.use('/auth', authRouter())
    routerIndex.use('/cart', cartRouter())
    routerIndex.use('/accounts', accountsRouter())
    routerIndex.use('/orders', ordersRouter())
    routerIndex.use('/payments', paymentsRouter())
    routerIndex.use('/shipping', shippingRouter())
    routerIndex.use('/products', productsRouter())

    return routerIndex
}

