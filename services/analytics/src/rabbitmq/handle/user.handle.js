export const userHandlers = {
  "user.created": (event) => {
    console.log(`✉️ Enviando mail de bienvenida a ${event.email}`)
    // TODO: Lógica de bienvenida
  },

  "user.login": (event) => {
    console.log(`📊 Registrando login de usuario ${event.username}`)
    // TODO: Guardar login en analytics
  },

  "user.logout": (event) => {
    console.log(`📊 Registrando logout de usuario ${event.username}`)
    // TODO: Guardar logout en analytics
  },

  "user.refresh": (event) => {
    console.log(`🔄 Token refrescado para usuario ${event.username}`)
    // TODO: Guardar refresh en analytics
  },
}
