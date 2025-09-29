// Simulación de DB en memoria
const usersDB = [
  { id: "123", name: "Peshito Malvado", email: "peshito@example.com" },
  { id: "456", name: "Juancito", email: "juan@example.com" }
]

export class AccountsController {
  // Obtener perfil de usuario
  getProfile = async (req, res) => {
    try {
      const { id } = req.params
      const user = usersDB.find(u => u.id === id)

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" })
      }

      console.log(`✅ Buscar perfil del usuario ${id}`)
      return res.json(user)
    } catch (error) {
      console.error("❌ Error en getProfile:", error.message)
      return res.status(500).json({ message: "Error obteniendo perfil" })
    }
  }

  // Actualizar perfil de usuario
  uploadProfile = async (req, res) => {
    try {
      const { id } = req.params
      const { name, email } = req.body

      const userIndex = usersDB.findIndex(u => u.id === id)
      if (userIndex === -1) {
        return res.status(404).json({ message: "Usuario no encontrado" })
      }

      // Actualizar solo los campos que vienen
      if (name) usersDB[userIndex].name = name
      if (email) usersDB[userIndex].email = email

      console.log(`✅ Perfil de usuario ${id} actualizado`)

      return res.json(usersDB[userIndex])
    } catch (error) {
      console.error("❌ Error en uploadProfile:", error.message)
      return res.status(500).json({ message: "Error actualizando perfil" })
    }
  }
}
