export const userHandlers = {
  "user.created": (event) => {
    console.log(`✉️ Creando perfil al usuario ${event.username}`);
    // TODO: Lógica de creación de perfil del usuario
  }
}