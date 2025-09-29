import axios from "axios"

export class AuthController {
  register = async (req, res) => {
    try {
      console.log("📩 Request recibido en API Gateway /register")
      const response = await axios.post("http://auth:3002/register", req.body)

      return res.status(response.status).json(response.data)
    } catch (error) {
      console.error("❌ Error al llamar a auth (register):", error.message)
      return res.status(500).json({ message: "Error en API Gateway /register" })
    }
  }

  login = async (req, res) => {
    try {
      console.log("📩 Request recibido en API Gateway /login")
      const response = await axios.post("http://auth:3002/login", req.body)

      return res.status(response.status).json(response.data)
    } catch (error) {
      console.error("❌ Error al llamar a auth (login):", error.message)
      return res.status(500).json({ message: "Error en API Gateway /login" })
    }
  }

  logout = async (req, res) => {
    try {
      console.log("📩 Request recibido en API Gateway /logout")
      const response = await axios.post("http://auth:3002/logout", req.body)

      return res.status(response.status).json(response.data)
    } catch (error) {
      console.error("❌ Error al llamar a auth (logout):", error.message)
      return res.status(500).json({ message: "Error en API Gateway /logout" })
    }
  }

  refresh = async (req, res) => {
    try {
      console.log("📩 Request recibido en API Gateway /refresh")
      const response = await axios.post("http://auth:3002/refresh", req.body)

      return res.status(response.status).json(response.data)
    } catch (error) {
      console.error("❌ Error al llamar a auth (refresh):", error.message)
      return res.status(500).json({ message: "Error en API Gateway /refresh" })
    }
  }
}
