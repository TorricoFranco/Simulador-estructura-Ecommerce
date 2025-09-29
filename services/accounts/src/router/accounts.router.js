import { Router } from "express"
import { AccountsController } from "../controller/accounts.controller.js"

export const accountsRouter = (app) => {
    const router = Router()
    const accountsController = new AccountsController()
    
    app.use("/", router)

    router.get('/users/:id', accountsController.getProfile)
    router.patch('/users/:id', accountsController.uploadProfile)

    return router
}
