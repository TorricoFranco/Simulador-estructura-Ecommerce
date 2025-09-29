import { Router } from "express"
import { AuthController } from "../controller/auth.controller.js"

export const authRouter = () => {
    const authRouter = Router()
    const authUserController = new AuthController()

    authRouter.post('/register', authUserController.register)
    authRouter.post('/login', authUserController.login)
    authRouter.post('/logout', authUserController.logout)
    authRouter.post('/refresh', authUserController.refresh)

    return authRouter 
}

// - `POST /auth/register` → crear cuenta.
// - `POST /auth/login` → iniciar sesión.
// - `POST /auth/logout` → cerrar sesión.
// - `GET /auth/refresh` → refrescar token.
