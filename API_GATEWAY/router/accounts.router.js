import { Router } from "express"
import { AccountsController } from "../controller/accounts.controller.js"

export const accountsRouter = () => {
    const accountsRouter = Router()
    const accountsController = new AccountsController()
    
    accountsRouter.get('/users/:id', accountsController.getProfile)
    accountsRouter.patch('/users/:id', accountsController.uploadProfile)

    return accountsRouter
}
