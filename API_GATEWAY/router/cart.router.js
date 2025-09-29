import { Router } from "express";
import { CartController } from "../controller/cart.controller.js";

export const cartRouter = () => {
    const cartRouter = Router()
    const cartController = new CartController()

    cartRouter.get('/', cartController.getCart)
    cartRouter.post('/', cartController.updateCart)
    cartRouter.delete('/:itemId', cartController.deleteCart)

    return cartRouter
}

// - `POST /cart` → agregar producto al carrito.
// - `GET /cart` → ver carrito actual.
// - `DELETE /cart/:itemId` → eliminar producto del carrito.
