import axios from "axios"
const ACCOUNTS_SERVICE = "http://accounts:3008"

export class AccountsController {
  // Obtener perfil desde el servicio de Accounts
  getProfile = async (req, res) => {
    try {
      const { id } = req.params
      const response = await axios.get(`${ACCOUNTS_SERVICE}/users/${id}`)
      return res.json(response.data)
    } catch (err) {
      console.error("❌ Error en getProfile:", err.message)
      return res.status(500).json({ message: "Error obteniendo perfil" })
    }
  }

  // Actualizar perfil en el servicio de Accounts
  uploadProfile = async (req, res) => {
    try {
      const { id } = req.params
      const response = await axios.patch(`${ACCOUNTS_SERVICE}/users/${id}`, req.body)
      return res.json(response.data)
    } catch (err) {
      console.error("❌ Error en uploadProfile:", err.message)
      return res.status(500).json({ message: "Error actualizando perfil" })
    }
  }
}
